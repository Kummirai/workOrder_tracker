import WorkOrderForm from "@/components/WorkOrderForm";

export default function WorkOrdersPage() {
  return (
    <main className="sm:p-5 max-w-6xl mx-auto">
      <h1 className="font-bold mb-5">Work Orders</h1>
      <h2 className="font-bold mb-5">Add New Work Order</h2>
      <WorkOrderForm />
    </main>
  );
}