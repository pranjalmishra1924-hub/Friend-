const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

await mongoose.connect(process.env.MONGO_URI);

        console.log("🧠 MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Full Error:");
        console.error(error);
       console.log("⚠️ Starting without MongoDB...");

    }
};

module.exports = connectDB;