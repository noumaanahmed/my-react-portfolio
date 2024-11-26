const admin = require('firebase-admin');
const fetch = require('node-fetch');
require('dotenv').config();


// Decode Firebase service account key from environment variable
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const ip =
    event.headers["x-forwarded-for"]?.split(",")[0] || "IP not available";

  if (ip === "IP not available") {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unable to retrieve IP address" }),
    };
  }

  try {
    // Fetch IP details from ipstack using the environment variable
    const ipstackResponse = await fetch(
      `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`
    );
    const ipData = await ipstackResponse.json();

    // Save IP data to Firebase
    await db.collection("visitors").add({
      ip: ipData.ip,
      country: ipData.country_name,
      region: ipData.region_name,
      city: ipData.city,
      zip: ipData.zip,
      latitude: ipData.latitude,
      longitude: ipData.longitude,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Visitor logged: ${ip}` }),
    };
  } catch (error) {
    console.error("Error logging visitor:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error logging visitor" }),
    };
  }
};
