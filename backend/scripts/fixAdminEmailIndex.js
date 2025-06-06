const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://jakariait:Jg0njUydl1srGwDE@jakaria.kd2ej.mongodb.net/AmazonFBASetup?retryWrites=true&w=majority"; // 🔁 Replace with your real connection string

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

const fixAdminEmails = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // 1. Find and remove duplicates (keeping one)
    const duplicates = await Admin.aggregate([
      {
        $group: {
          _id: "$email",
          ids: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    for (const dup of duplicates) {
      const idsToDelete = dup.ids.slice(1); // keep one
      await Admin.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`🗑️ Removed ${idsToDelete.length} duplicates for email: ${dup._id}`);
    }

    // 2. Drop the current email index (if exists)
    const indexes = await Admin.collection.getIndexes({ full: true });
    const emailIndex = indexes.find((i) => i.key.email === 1);
    if (emailIndex) {
      await Admin.collection.dropIndex(emailIndex.name);
      console.log("❌ Dropped existing email index:", emailIndex.name);
    }

    // 3. Recreate the unique index
    await Admin.collection.createIndex({ email: 1 }, { unique: true });
    console.log("✅ Created new unique index on email");

    mongoose.disconnect();
    console.log("🚪 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error.message);
    mongoose.disconnect();
  }
};

fixAdminEmails();
