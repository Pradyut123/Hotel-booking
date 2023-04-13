import mongoose from "mongoose";

const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);

mongoose.connect(DB).then(()=> {
    console.log(`connection Successful`);
  }).catch((error) => console.log(`not connected`));