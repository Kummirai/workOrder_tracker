import WorkOrderForm from "@/components/WorkOrderForm";

export default function WorkOrdersPage() {
  return (
    <main className="p-2 sm:p-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5">Work Orders</h1>
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-5">Add New Work Order</h2>
        <WorkOrderForm />
      </div>
    </main>
  );
}