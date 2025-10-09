
import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  const { workOrdersCollection } = await getCollections();

  let query = {};
  if (search) {
    query = {
      $or: [
        { "jobAddress.jobNumber": { $regex: search, $options: 'i' } },
        { "jobAddress.streetName": { $regex: search, $options: 'i' } }
      ]
    };
  }

  const workOrders = await workOrdersCollection.find(query).toArray();
  return NextResponse.json(workOrders);
}

export async function POST(request) {
  const { workOrder } = await request.json();
  const { workOrdersCollection } = await getCollections();
  const result = await workOrdersCollection.insertOne(workOrder);
  return NextResponse.json({ result });
}
