import fs from 'fs';
import connectDB from "../db.js";
import models from "../models/index.js";


const backupFilePath = 'products_backup.json';

const backupProducts = async () => {
  try {
    const products = await models.Product.find().exec();
    fs.writeFileSync(backupFilePath, JSON.stringify(products, null, 2), 'utf-8');
    console.log('Products backed up successfully.');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const deleteAllProducts = async () => {
  try {
    await models.Product.deleteMany();
    console.log('All products deleted successfully.');
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};

const restoreProducts = async () => {
  try {
    const products = JSON.parse(fs.readFileSync(backupFilePath, 'utf-8'));
    await models.Product.insertMany(products);
    console.log('Products restored successfully.');
  } catch (error) {
    console.error('Error restoring products:', error);
  }
};

const main = async () => {
    process.env.MONGO_URI = 'mongodb+srv://Aiganym:AiganymAyazhanforever@cluster0.f3jh010.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    await connectDB();

  await backupProducts();
  await deleteAllProducts();
  await restoreProducts();
};

main();
