const fetch = require("node-fetch-commonjs");
const admin = require("firebase-admin");

// Decode Firebase service account key
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
    // Parse body safely and provide default values
    let requestBody = {};
    if (event.body) {
      try {
        requestBody = JSON.parse(event.body);
      } catch (error) {
        console.error("Invalid JSON in request body:", error.message);
      }
    }
    const { latitude = null, longitude = null } = requestBody;

    // Step 1: Extract IP addresses from headers
    const allIPs = event.headers["x-forwarded-for"]?.split(",") || [];
    const clientIP = event.headers["x-nf-client-connection-ip"] || "";
    const ipList = [...allIPs, clientIP].filter(Boolean);

    // Step 2: Prioritize IPv4
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const ipv4Address = ipList.find((ip) => ipv4Regex.test(ip));
    const fallbackIP = ipList.find((ip) => ip.includes(":")); // IPv6 fallback
    const selectedIP = ipv4Address || fallbackIP;

    if (!selectedIP) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unable to retrieve any valid IP address" }),
      };
    }

    // Step 3: Fetch details from IPStack
    const ipstackResponse = await fetch(
      `http://api.ipstack.com/${selectedIP}?access_key=${process.env.IPSTACK_API_KEY}`
    );
    const ipData = await ipstackResponse.json();

    if (!ipData || !ipData.ip) {
      console.error("Invalid IPStack response", ipData);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "IPStack response invalid" }),
      };
    }

    // Step 4: Log data to Firebase
    await db.collection("visitors").add({
      ip: ipData.ip,
      ipType: ipv4Address ? "IPv4" : "IPv6",
      fallbackIP: ipv4Address ? null : fallbackIP,
      country: ipData.country_name,
      region: ipData.region_name,
      city: ipData.city,
      zip: ipData.zip,
      latitude: latitude || ipData.latitude, // Use browser latitude if available
      longitude: longitude || ipData.longitude, // Use browser longitude if available
      timestamp: new Date().toISOString(),
      headers: {
        allIPs: ipList,
        userAgent: event.headers["user-agent"] || "Not available",
        referer: event.headers["referer"] || "Not available",
        host: event.headers["host"] || "Not available",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Visitor logged: ${selectedIP}`,
        ipDetails: ipData,
        ipType: ipv4Address ? "IPv4" : "IPv6",
      }),
    };
  } catch (error) {
    console.error("Error logging visitor:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error logging visitor" }),
    };
  }
};
