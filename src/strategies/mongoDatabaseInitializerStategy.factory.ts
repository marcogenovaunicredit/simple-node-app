import * as Mongoose from 'mongoose';
import { DatabaseStrategies } from '../types/databaseStrategies';
import { Strategy } from './basic.strategy';
import { MongoInitializerStrategy } from './database/mongo/mongoInitializer.strategy';

export class MongoInitializerStrategyFactory {
    static async getStrategy(strategyCode: string | undefined): Promise<Strategy<Mongoose.Connection>> {
        switch (strategyCode) {
            default: {
                return new MongoInitializerStrategy(DatabaseStrategies.mongoStd);
            }
        }
    }
}