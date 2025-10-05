
import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const { boqItemsCollection } = await getCollections();
  const boqItems = await boqItemsCollection.find({}).toArray();
  return NextResponse.json(boqItems);
}
