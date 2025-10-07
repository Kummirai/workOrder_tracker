import WorkOrderForm from "@/components/WorkOrderForm";

export default function WorkOrdersPage() {
  return (
    <main className="p-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Work Orders</h1>
      <h2 className="text-xl font-bold mb-5">Add New Work Order</h2>
      <WorkOrderForm />
    </main>
  );
}