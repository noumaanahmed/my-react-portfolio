const fetch = require("node-fetch-commonjs");
const admin = require("firebase-admin");

// Decode Firebase service account key from environment variable
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString()
);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    // Step 1: Extract IP address from headers
    let clientIP =
      event.headers["x-nf-client-connection-ip"] || // Netlify-specific header
      event.headers["x-forwarded-for"]?.split(",")[0] || // Fallback to generic proxy header
      "IP not available";

    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; // Matches IPv4 addresses

    // Log if it's not IPv4, but still proceed to handle IPv6
    if (!ipv4Regex.test(clientIP)) {
      console.warn(`Non-IPv4 detected: ${clientIP}`);
    }

    if (clientIP === "IP not available") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unable to retrieve IP address" }),
      };
    }

    // Step 2: Fetch IP details from IPStack
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

    // Step 3: Save IP data to Firebase
    await db.collection("visitors").add({
      ip: ipData.ip,
      type: ipv4Regex.test(clientIP) ? "IPv4" : "IPv6", // Label IP version
      country: ipData.country_name,
      region: ipData.region_name,
      city: ipData.city,
      zip: ipData.zip,
      latitude: ipData.latitude,
      longitude: ipData.longitude,
      timestamp: new Date().toISOString(),
      headers: {
        clientIP: clientIP,
        userAgent: event.headers["user-agent"] || "Not available",
        referer: event.headers["referer"] || "Not available",
        host: event.headers["host"] || "Not available",
      },
    });

    // Step 4: Structure the Response
    const responseDetails = `
      city: "${ipData.city}" (string)
      country: "${ipData.country_name}" (string)
      ip: "${ipData.ip}" (string)
      type: "${ipv4Regex.test(clientIP) ? "IPv4" : "IPv6"}" (string)
      latitude: ${ipData.latitude} (number)
      longitude: ${ipData.longitude} (number)
      region: "${ipData.region_name}" (string)
      timestamp: "${new Date().toISOString()}" (string)
      zip: "${ipData.zip}" (string)
      
      <Headers Information>
      Client IP (x-nf-client-connection-ip): "${clientIP}"
      Forwarded IP (x-forwarded-for): "${event.headers["x-forwarded-for"] || 'Not available'}"
      User-Agent: "${event.headers["user-agent"] || 'Not available'}"
      Referrer: "${event.headers["referer"] || 'Not available'}"
      Host: "${event.headers["host"] || 'Not available'}"
    `;

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
