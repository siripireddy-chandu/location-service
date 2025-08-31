import fetch from "node-fetch";

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Safe in Vercel

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json({
      address: data.results?.[0]?.formatted_address || "Address not found",
      raw: data
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch address" });
  }
}
