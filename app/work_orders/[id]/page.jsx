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

export default async function WorkOrderDetailsPage({ params }) {
  const workOrder = await getWorkOrder(params.id);

  if (!workOrder) {
    return <p>Work order not found.</p>;
  }

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-5">Work Order Details</h1>
      <div className="border p-4 rounded-lg border-gray-300">
        <h2 className="text-xl font-bold mb-2">{workOrder.jobAddress.jobNumber}</h2>
        <address className="not-italic mb-4">
          {workOrder.jobAddress.streetNumber} {workOrder.jobAddress.streetName}, {workOrder.jobAddress.surburb}<br />
          {workOrder.jobAddress.city}
        </address>
        <p className="mb-4"><strong>Date:</strong> {workOrder.date}</p>
        <p className="mb-4"><strong>Status:</strong> {workOrder.status}</p>

        <h3 className="text-lg font-bold mb-2">Work Items</h3>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Rate</th>
              <th className="border border-gray-300 p-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {workOrder.jobDetails.workItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.description}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">R {item.rate.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">R {item.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right">
          <h4 className="text-xl font-bold">Total Cost: R {workOrder.jobDetails.cost.toFixed(2)}</h4>
        </div>
      </div>
    </main>
  );
}
