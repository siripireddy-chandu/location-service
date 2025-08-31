import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { lat, lon } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    console.log("Google API URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Google API Response:", data);

    res.status(200).json({
      address: data.results?.[0]?.formatted_address || "Address not found",
      raw: data
    });
  } catch (err) {
    console.error("Handler Error:", err);
    res.status(500).json({ error: "Failed to fetch address" });
  }
}
