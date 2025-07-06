const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

 router.get("/:id", async (req, res) => {
  const rideId = req.params.id;
  try {
    const ride = await req.db.collection("rides").findOne({ _id: new ObjectId(rideId) });
    if (!ride) return res.status(404).json({ error: "Ride not found" });
    res.json({ success: true, ride });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ride details" });
  }
});
 
router.get("/", async (req, res) => {
  try {
    const rides = await req.db
      .collection("rides")
      .find({ status: { $ne: "completed" } })
      .toArray();

    res.json({ rides });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});

router.post("/", async (req, res) => {
  const { passenger_email, pickup_location, drop_location, ride_type } = req.body;
  try {
    const ride = {
      passenger_email,
      pickup_location,
      drop_location,
      ride_type,
      status: "requested",
      driver_email: null,
      createdAt: new Date(),
    };
    const result = await req.db.collection("rides").insertOne(ride);
    res.status(201).json({ success: true, rideId: result.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to create ride" });
  }
});

 
router.get("/requested", async (req, res) => {
  try {
    const rides = await req.db.collection("rides").find({ status: "requested" }).toArray();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});

 
router.put("/:id/accept", async (req, res) => {
  const rideId = req.params.id;
  const { driver_email } = req.body;
  try {
    await req.db.collection("rides").updateOne(
      { _id: new ObjectId(rideId), status: "requested" },
      { $set: { driver_email, status: "in-progress" } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to accept ride" });
  }
});

router.put("/:id/complete", async (req, res) => {
  const rideId = req.params.id;
  try {
    await req.db.collection("rides").updateOne(
      { _id: new ObjectId(rideId), status: "in-progress" },
      { $set: { status: "completed" } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to complete ride" });
  }
});

module.exports = router;
