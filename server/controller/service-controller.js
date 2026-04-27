const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No service found" });
    }

    // ✅ DIRECT ARRAY SEND KARO
    res.status(200).json(response);

  } catch (error) {
    console.log(`services: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { services };
