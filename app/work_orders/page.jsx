import WorkOrderForm from "@/components/WorkOrderForm";
import WorkOrdersList from "./WorkOrdersList";

export default function WorkOrdersPage() {
  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-5">Work Orders</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-5">Add New Work Order</h2>
          <WorkOrderForm />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-5">Existing Work Orders</h2>
          <WorkOrdersList />
        </div>
      </div>
    </main>
  );
}
