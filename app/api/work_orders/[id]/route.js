import { getCollections } from '@/utils/db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  const { workOrdersCollection } = await getCollections();
  const workOrder = await workOrdersCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json(workOrder);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { workOrder } = await request.json();
  const { workOrdersCollection } = await getCollections();
  
  delete workOrder._id;

  const result = await workOrdersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: workOrder }
  );
  return NextResponse.json({ result });
}
