
import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { jobData } = await request.json();
  const { workOrdersCollection } = await getCollections();
  const result = await workOrdersCollection.insertOne(jobData);
  return NextResponse.json({ result });
}
