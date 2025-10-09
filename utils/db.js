import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "work_order_tracker";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollections() {
  const { db } = await connectToDatabase();
  const boqItemsCollection = db.collection("boq_items");
  const workOrdersCollection = db.collection("work_orders");
  const appPinCollection = db.collection("app-pin");
  return { boqItemsCollection, workOrdersCollection, appPinCollection };
}
