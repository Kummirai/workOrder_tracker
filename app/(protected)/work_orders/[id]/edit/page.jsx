import WorkOrderForm from "@/components/WorkOrderForm";
import { getCollections } from "@/utils/db";
import { ObjectId } from "mongodb";

async function getWorkOrder(id) {
  const { workOrdersCollection } = await getCollections();
  const workOrder = await workOrdersCollection.findOne({ _id: new ObjectId(id) });
  if (workOrder) {
    workOrder._id = workOrder._id.toString();
    if(workOrder.jobDetails && workOrder.jobDetails.workItems) {
        workOrder.jobDetails.workItems.forEach(item => {
            if(item.boqId) item.boqId = item.boqId.toString();
        });
    }
  }
  return workOrder;
}

export default async function EditWorkOrderPage({ params: { id } }) {
  const workOrder = await getWorkOrder(id);

  if (!workOrder) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <p className="font-semibold text-red-500">Work order not found.</p>
      </div>
    );
  }

  return (
    <main className="p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold mb-5">Edit Work Order</h1>
        <WorkOrderForm workOrderToEdit={workOrder} />
      </div>
    </main>
  );
}
