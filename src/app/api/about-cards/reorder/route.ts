import { NextRequest, NextResponse } from 'next/server';
import { BackendAboutCardService } from '@/lib/backend/services/about-card.service';
import { apiHandler } from '@/lib/backend/api-handler';

const aboutCardService = new BackendAboutCardService();

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { cardIds } = body; // Array of card IDs in the new order

  const reorderedCards = await aboutCardService.reorderCards(cardIds);
  return NextResponse.json(reorderedCards);
});
