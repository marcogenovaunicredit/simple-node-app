import process from 'process';
import { ScalingStrategyFactory } from './strategies/scalingStrategy.factory';
import { Strategy } from './strategies/basic.strategy';
import { MongoInitializerStrategyFactory } from './strategies/mongoDatabaseInitializerStategy.factory';

//TODO create a proper runner
(async () => {
    //check the connection to database and initialize the connection pool
    //TODO this part should be protected in a better way, the runner should manage the life-cyle in a specific way 
    let initializerStrategy:Strategy<any> = await MongoInitializerStrategyFactory.getStrategy(process.env.DATABASE_STRATEGY);
    await initializerStrategy.execute();
    let scalingStrategy: Strategy<any> = await ScalingStrategyFactory.getStrategy(process.env.SCALING_STRATEGY);
    await scalingStrategy.execute();
})();