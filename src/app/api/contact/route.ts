import { NextRequest, NextResponse } from 'next/server';
import { BackendContactService } from '@/lib/backend/services/contact.service';
import { apiHandler } from '@/lib/backend/api-handler';
import { createContactSchema, updateContactSchema } from '@/lib/backend/schemas/portfolio.schema';

const contactService = new BackendContactService();

export const GET = apiHandler(async (req: NextRequest, params, queryOptions) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const unread = searchParams.get('unread');

  let response;
  if (unread === 'true') {
    response = await contactService.getUnreadContacts();
  } else if (status) {
    response = await contactService.getContactsByStatus(status);
  } else {
    response = await contactService.findMany(queryOptions);
  }

  return NextResponse.json(response);
}, { processQuery: true });

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const newContact = await contactService.create(body);
  return NextResponse.json(newContact, { status: 201 });
}, { schema: createContactSchema });

export const PUT = apiHandler(async (request) => {
  const body = await request.json();
  const { id, ...data } = body;
  const updatedContact = await contactService.update(id, data);
  return NextResponse.json(updatedContact);
}, { schema: updateContactSchema });
