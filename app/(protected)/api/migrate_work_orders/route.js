import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { workOrdersCollection, boqItemsCollection } = await getCollections();

    // 1. Fetch all BOQ items and create a map from boqId to itemNumber.
    const boqItems = await boqItemsCollection.find({}).toArray();
    const boqIdToItemNumberMap = new Map();
    for (const boqItem of boqItems) {
      boqIdToItemNumberMap.set(boqItem._id.toString(), boqItem.itemNumber);
    }

    // 2. Fetch all work orders that might need migration.
    const workOrdersToMigrate = await workOrdersCollection.find({
      "jobDetails.workItems.itemNumber": { $exists: false }
    }).toArray();

    if (workOrdersToMigrate.length === 0) {
      return NextResponse.json({ message: "No work orders needed migration." });
    }

    const bulkOps = [];

    // 3. Iterate and prepare updates.
    for (const order of workOrdersToMigrate) {
      let needsUpdate = false;
      const updatedWorkItems = order.jobDetails.workItems.map(item => {
        if (item.boqId && item.itemNumber === undefined) {
          const itemNumber = boqIdToItemNumberMap.get(item.boqId.toString());
          if (itemNumber !== undefined) {
            needsUpdate = true;
            return { ...item, itemNumber: itemNumber };
          }
        }
        return item;
      });

      if (needsUpdate) {
        bulkOps.push({
          updateOne: {
            filter: { _id: order._id },
            update: { $set: { "jobDetails.workItems": updatedWorkItems } }
          }
        });
      }
    }

    if (bulkOps.length > 0) {
      await workOrdersCollection.bulkWrite(bulkOps);
    }

    return NextResponse.json({
      message: `Migration successful.`,
      total_found: workOrdersToMigrate.length,
      total_updated: bulkOps.length
    });

  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json({ message: "Migration failed.", error: error.message }, { status: 500 });
  }
}
