
import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const { boqItemsCollection } = await getCollections();

  let query = {};
  if (search) {
    query = {
      $or: [
        { itemNumber: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const boqItems = await boqItemsCollection.find(query).toArray();
  return NextResponse.json(JSON.parse(JSON.stringify(boqItems)));
}
