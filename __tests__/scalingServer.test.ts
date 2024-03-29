import { ScalingServerStrategy } from '../src/strategies/scaling/scalingServer.strategy';
import { ScalingGenericCloudStrategy } from '../src/strategies/scaling/scalingGenericCloud.strategy';
import { ScalingStrategyFactory } from '../src/strategies/scalingStrategy.factory';
import { Strategy } from '../src/strategies/basic.strategy';
import { ScalingStrategies } from '../src/types/scalingStrategies';

describe('Testing the configuration of the Scaling Server Strategy', () => {
    test('manage the undefined logic block', async () => {
        let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(() => false, undefined, undefined);

        try {
            await serverStrategy.execute()
        } catch (exception) { fail('error occurred on strategy skeleton'); }

    });

    test('Verify how many time the master is called in the multi threads executions', async () => {
        let spyMaster = jest.fn();
        let spySecondary = jest.fn();
        let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(() => true, spyMaster, spySecondary);
        await serverStrategy.execute();
        expect(spyMaster).toHaveBeenCalledTimes(1);
        expect(spySecondary).toHaveBeenCalledTimes(0);
    });

    test('Verify how many time the secondary is called in the multi threads executions', async () => {
        let spyMaster = jest.fn();
        let spySecondary = jest.fn();
        let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(() => false, spyMaster, spySecondary);
        await serverStrategy.execute();
        expect(spyMaster).toHaveBeenCalledTimes(0);
        expect(spySecondary).toHaveBeenCalledTimes(1);
    });
});


describe('Testing the configuration of the Scaling Generic Cloud Strategy', () => {
    test('manage the undefined logic block', async () => {
        let cloudStrategy: ScalingGenericCloudStrategy = new ScalingGenericCloudStrategy(undefined);

        try {
            await cloudStrategy.execute()
        } catch (exception) { fail('error occurred on strategy skeleton'); }

    });

    test('Verify how many time the single block is called in single thread execution', async () => {
        let spyMaster = jest.fn();
        let cloudStrategy: ScalingGenericCloudStrategy = new ScalingGenericCloudStrategy(spyMaster);
        await cloudStrategy.execute();
        expect(spyMaster).toHaveBeenCalledTimes(1);
    });
});

describe('Testing the factory of the Scaling Strategy', () => {
    test('check all the options', async () => {
        let myStrategy: Strategy<void> = await ScalingStrategyFactory.getStrategy(ScalingStrategies.cloud);
        let strategyCode: string = await myStrategy.getCode();
        expect(strategyCode).toEqual(ScalingStrategies.cloud);

        myStrategy = await ScalingStrategyFactory.getStrategy(ScalingStrategies.server);
        strategyCode = await myStrategy.getCode();
        expect(strategyCode).toEqual(ScalingStrategies.server);

        myStrategy = await ScalingStrategyFactory.getStrategy('');
        expect(strategyCode).toEqual(ScalingStrategies.server);
    });
});
