import fetch from "node-fetch"; // Ensure you're using "node-fetch-commonjs" if CommonJS
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    // Step 1: Extract the visitor's IP address
    const clientIP =
      event.headers["x-nf-client-connection-ip"] || // Netlify-specific header
      event.headers["x-forwarded-for"]?.split(",")[0] || // Fallback to generic proxy header
      "IP not available";

    if (clientIP === "IP not available") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unable to retrieve IP address" }),
      };
    }

    // Step 2: Use IPStack to fetch IP details
    const ipstackResponse = await fetch(
      `http://api.ipstack.com/${clientIP}?access_key=${process.env.IPSTACK_API_KEY}`
    );
    const ipData = await ipstackResponse.json();

    if (!ipData || !ipData.ip) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "IPStack response invalid" }),
      };
    }

    // Step 3: Log IP details to Firebase
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

    // Step 4: Structure the Response
    const responseDetails = `
      city: "${ipData.city}" (string)
      country: "${ipData.country_name}" (string)
      ip: "${ipData.ip}" (string)
      latitude: ${ipData.latitude} (number)
      longitude: ${ipData.longitude} (number)
      region: "${ipData.region_name}" (string)
      timestamp: "${new Date().toISOString()}" (string)
      zip: "${ipData.zip}" (string)
      
      <Headers Information>
      Client IP (x-nf-client-connection-ip): "${event.headers["x-nf-client-connection-ip"] || 'Not available'}"
      Forwarded IP (x-forwarded-for): "${event.headers["x-forwarded-for"] || 'Not available'}"
      User-Agent: "${event.headers["user-agent"] || 'Not available'}"
      Referrer: "${event.headers["referer"] || 'Not available'}"
      Host: "${event.headers["host"] || 'Not available'}"
    `;

    // Step 5: Return Response
    return {
      statusCode: 200,
      body: responseDetails.replace(/\n/g, "<br>"), // Converts newlines to <br> for easier viewing in a browser
    };
  } catch (error) {
    console.error("Error logging visitor:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error logging visitor" }),
    };
  }
};
