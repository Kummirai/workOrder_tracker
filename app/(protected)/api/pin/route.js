import { getCollections } from '@/utils/db';
import { NextResponse } from 'next/server';

// Helper function to get the PIN, and create if it doesn't exist
async function getOrCreatePin(appPinCollection) {
  let appPin = await appPinCollection.findOne({ name: 'app-pin' });
  if (!appPin) {
    const defaultPin = '1234'; // Default PIN
    await appPinCollection.insertOne({ name: 'app-pin', pin: defaultPin });
    return defaultPin;
  }
  return appPin.pin;
}

export async function GET() {
  try {
    const { appPinCollection } = await getCollections();
    const pin = await getOrCreatePin(appPinCollection);
    return NextResponse.json({ pin });
  } catch (error) {
    return NextResponse.json({ message: "Failed to get PIN.", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { currentPin, newPin } = await request.json();
    const { appPinCollection } = await getCollections();
    
    const appPin = await appPinCollection.findOne({ name: 'app-pin' });

    if (!appPin || appPin.pin !== currentPin) {
      return NextResponse.json({ message: "Incorrect current PIN." }, { status: 400 });
    }

    await appPinCollection.updateOne(
      { name: 'app-pin' },
      { $set: { pin: newPin } }
    );

    return NextResponse.json({ message: "PIN updated successfully." });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update PIN.", error: error.message }, { status: 500 });
  }
}