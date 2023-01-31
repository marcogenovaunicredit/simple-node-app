import process from 'process';
import { ScalingStrategyFactory } from './strategies/scalingStrategy.factory';
import { Strategy } from './strategies/basic.strategy';

//TODO create a proper runner
(async () => {
    let strategy: Strategy<void> = await ScalingStrategyFactory.getStrategy(process.env.SCALING_STRATEGY);
    await strategy.execute();
})();