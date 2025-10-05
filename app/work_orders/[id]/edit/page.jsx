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

export default async function EditWorkOrderPage({ params }) {
  const workOrder = await getWorkOrder(params.id);

  if (!workOrder) {
    return <p>Work order not found.</p>;
  }

  return (
    <main className="p-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5">Edit Work Order</h1>
      <div className="w-full max-w-4xl">
        <WorkOrderForm workOrderToEdit={workOrder} />
      </div>
    </main>
  );
}
