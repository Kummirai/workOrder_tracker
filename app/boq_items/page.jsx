
import { getCollections } from "@/utils/db";

export default async function BoqItems() {
  const { boqItemsCollection } = await getCollections();
  const boqItems = await boqItemsCollection.find({}).toArray();

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-5">BOQ Items</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 whitespace-nowrap">Item Number</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Description</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Unit</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Quantity Unit</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Rate</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Currency</th>
          </tr>
        </thead>
        <tbody>
          {boqItems.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.itemNumber}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.description}</td>
              <td className="border border-ray-300 p-2 whitespace-nowrap">{item.unit}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.quantityUnit}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.rate}</td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">{item.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
