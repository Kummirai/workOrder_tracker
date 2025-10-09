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
  const payload = await request.json();
  const { workOrdersCollection } = await getCollections();

  const dataToUpdate = payload.workOrder ? payload.workOrder : payload;
  if (dataToUpdate._id) {
    delete dataToUpdate._id;
  }

  const result = await workOrdersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: dataToUpdate }
  );
  return NextResponse.json({ result });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const { workOrdersCollection } = await getCollections();
    const result = await workOrdersCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ result });
}
