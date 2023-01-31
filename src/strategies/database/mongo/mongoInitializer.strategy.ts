import { Strategy } from '../../basic.strategy';
import { acquireMongooseModel, connectDatabase } from '../../../utilities/mongo.database';
import * as Mongoose from 'mongoose';
import { MongooseMetaModel } from '../../../models/database/mongoose.model';

export class MongoInitializerStrategy extends Strategy<Mongoose.Connection> {
  private static _instance: Mongoose.Connection;

  async execute(): Promise<Mongoose.Connection> {

    if (!MongoInitializerStrategy._instance) {
      MongoInitializerStrategy._instance = await connectDatabase();

      //TODO add a mechanism to load dynamically the schema
      const _model: MongooseMetaModel | undefined = await acquireMongooseModel('product', 'models/database/mongoose/product.model.json');

      if (_model !== undefined) {
        MongoInitializerStrategy._instance.model(_model.identifier, new Mongoose.Schema(_model.model));
      }
    }

    return MongoInitializerStrategy._instance;
  }
}