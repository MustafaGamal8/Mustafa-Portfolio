import { NextRequest, NextResponse } from 'next/server';

type TranslationDirection = 'EN_TO_AR' | 'AR_TO_EN';

interface TranslateBody {
  direction: TranslationDirection;
  values: Record<string, any>;
}

const skipTranslationPattern = /^(https?:\/\/|www\.|\S+@\S+\.\S+|\+?[0-9\s().-]{7,})$/i;

const extractTranslatedText = (translated: unknown): string => {
  if (typeof translated === 'string') {
    return translated;
  }

  if (Array.isArray(translated) && translated.length > 0 && Array.isArray(translated[0])) {
    return translated
      .map((chunk: any) => (Array.isArray(chunk) ? chunk[0] : ''))
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  return '';
};

const translateWithGoogleFallback = async (text: string, source: string, target: string): Promise<string> => {
  const endpoint = new URL('https://translate.googleapis.com/translate_a/single');
  endpoint.searchParams.set('client', 'gtx');
  endpoint.searchParams.set('sl', source.toLowerCase());
  endpoint.searchParams.set('tl', target.toLowerCase());
  endpoint.searchParams.set('dt', 't');
  endpoint.searchParams.set('q', text);

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Google translation failed with status ${response.status}`);
  }

  const data = await response.json();
  const translated = extractTranslatedText(data?.[0]);
  return translated || text;
};

const translateWithLibreTranslate = async (
  text: string,
  source: string,
  target: string,
  endpoint: string,
  apiKey?: string
): Promise<string> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: source.toLowerCase(),
      target: target.toLowerCase(),
      format: 'text',
      ...(apiKey ? { api_key: apiKey } : {}),
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`LibreTranslate failed with status ${response.status}`);
  }

  const data = await response.json();
  return typeof data?.translatedText === 'string' && data.translatedText.trim().length > 0
    ? data.translatedText
    : text;
};

const translateText = async (text: string, source: string, target: string): Promise<string> => {
  const normalized = text.trim();
  if (!normalized || skipTranslationPattern.test(normalized)) {
    return text;
  }

  const libreEndpoint = process.env.LIBRETRANSLATE_URL;
  const libreKey = process.env.LIBRETRANSLATE_API_KEY;

  if (libreEndpoint) {
    try {
      return await translateWithLibreTranslate(normalized, source, target, libreEndpoint, libreKey);
    } catch {
      // Fallback to Google endpoint below
    }
  }

  return translateWithGoogleFallback(normalized, source, target);
};

const translateRecursive = async (value: any, source: string, target: string): Promise<any> => {
  if (typeof value === 'string') {
    return translateText(value, source, target);
  }

  if (Array.isArray(value)) {
    const translatedArray = await Promise.all(value.map((item) => translateRecursive(item, source, target)));
    return translatedArray;
  }

  if (value && typeof value === 'object') {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, nestedValue]) => [key, await translateRecursive(nestedValue, source, target)] as const)
    );
    return Object.fromEntries(entries);
  }

  return value;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TranslateBody;
    const direction = body?.direction;
    const values = body?.values;

    if (!direction || (direction !== 'EN_TO_AR' && direction !== 'AR_TO_EN')) {
      return NextResponse.json({ error: 'Invalid translation direction' }, { status: 400 });
    }

    if (!values || typeof values !== 'object') {
      return NextResponse.json({ error: 'Values object is required' }, { status: 400 });
    }

    const source = direction === 'EN_TO_AR' ? 'EN' : 'AR';
    const target = direction === 'EN_TO_AR' ? 'AR' : 'EN';
    const translatedValues = await translateRecursive(values, source, target);

    return NextResponse.json({
      success: true,
      source,
      target,
      values: translatedValues,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Translation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}