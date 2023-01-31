import mongoose, * as Mongoose from "mongoose";
import { readFile, stat } from "fs/promises";
import { MongooseMetaModel } from '../models/database/mongoose.model';

export const connectDatabase = async (): Promise<Mongoose.Connection> => {
  let uri: string | undefined = process.env.DATABASE_URI;
  if (uri === undefined) uri = 'mongodb://localhost:27017/LOCAL_TEST';

  Mongoose.set('strictQuery', true);
  const mongooseConfiguration: object = JSON.parse(await readFile('./mongoose-configuration.json', "utf8"));
  const database: Mongoose.Connection = Mongoose.createConnection(uri, mongooseConfiguration);
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", async () => {
    console.log("Error connecting to database");
  });

  return database;
};


export const acquireMongooseModel = async (modelId: string, pathRef: string): Promise<MongooseMetaModel|undefined> => {
  let mmm: MongooseMetaModel|undefined  = undefined;
  
  if (pathRef && (await stat(pathRef)).isFile()) {
    mmm = {identifier: modelId, model: JSON.parse(await readFile(pathRef, "utf8"))};
  }

  return mmm;
};