const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()



async function ConnectDB() {
    await mongoose.connect(process.env.DB_URL)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

module.exports = ConnectDB;
