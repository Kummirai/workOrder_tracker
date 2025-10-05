
import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const { workOrdersCollection } = await getCollections();
  const workOrders = await workOrdersCollection.find({}).toArray();
  return NextResponse.json(workOrders);
}

export async function POST(request) {
  const { workOrder } = await request.json();
  const { workOrdersCollection } = await getCollections();
  const result = await workOrdersCollection.insertOne(workOrder);
  return NextResponse.json({ result });
}
