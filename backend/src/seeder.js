import connectDB from "./config/database.js";
import AdminModel from "./model/admin.js";

connectDB();

const adminData = [
  {
    currentWeek: 2,
  },
];

const importData = async () => {
  try {
    await AdminModel.deleteMany();
    await AdminModel.insertMany(adminData);
    console.log("Data Added");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

importData()