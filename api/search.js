import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { query } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results.map(r => ({
      address: r.formatted_address,
      location: r.geometry.location, // { lat, lng }
    }));

    res.status(200).json({ results });
  } catch (err) {
    console.error("Handler Error:", err);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
}
