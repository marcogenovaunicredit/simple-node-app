import { acquireMongooseModel } from '../src/utilities/mongo.database';
import { MongooseMetaModel } from '../src/models/database/mongoose.model';
import {TestModel} from './resources/test.model';
import { DatabaseStrategies } from '../src/types/databaseStrategies';
import { Strategy } from '../src/strategies/basic.strategy';
import { MongoInitializerStrategyFactory } from '../src/strategies/mongoDatabaseInitializerStategy.factory';

describe('Acquire test model', () => {
    test('Read meta model and check properties of model', async () => {
        const mmm: MongooseMetaModel|undefined = await acquireMongooseModel('test', './__tests__/resources/mongoose.metamodel.001.json');
        expect(mmm).not.toBeUndefined();
        expect(mmm?.identifier).toEqual('test');
        expect(mmm?.model).not.toBeUndefined();

        console.log(JSON.stringify(mmm?.model));

        const _model: TestModel = mmm?.model as TestModel;
        expect(_model.property).not.toBeUndefined();
    });
});

describe('Testing the factory of the Database Initializer Strategy', () => {
    test('check all the options', async () => {
        let myStrategy: Strategy<any> = await MongoInitializerStrategyFactory.getStrategy(DatabaseStrategies.mongoStd);
        let strategyCode: string = await myStrategy.getCode();
        expect(strategyCode).toEqual(DatabaseStrategies.mongoStd);

        myStrategy = await MongoInitializerStrategyFactory.getStrategy(undefined);
        strategyCode = await myStrategy.getCode();
        expect(strategyCode).toEqual(DatabaseStrategies.mongoStd);
    });
});
