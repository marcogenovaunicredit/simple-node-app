import { ScalingServerStrategy } from '../src/strategies/scaling/scalingServer.strategy';

describe('Testing the configuration of the Scaling Server Strategy', () => {
    test('manage the undefined logic block', async () => {
       let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(()=>false, undefined, undefined);
       
       try {
        await serverStrategy.execute()
       } catch (exception) {fail('error occurred on strategy skeleton');}
       
    });

    test('Verify how many time the master is called in the correct on master thread', async () => {
        let spyMaster = jest.fn();
        let spySecondary = jest.fn();
        let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(()=>true, spyMaster, spySecondary);
        await serverStrategy.execute();
        expect(spyMaster).toHaveBeenCalledTimes(1);
        expect(spySecondary).toHaveBeenCalledTimes(0);
    });

    test('Verify how many time the secondary is called in the correct on master thread', async () => {
        let spyMaster = jest.fn();
        let spySecondary = jest.fn();
        let serverStrategy: ScalingServerStrategy = new ScalingServerStrategy(()=>false, spyMaster, spySecondary);
        await serverStrategy.execute();
        expect(spyMaster).toHaveBeenCalledTimes(0);
        expect(spySecondary).toHaveBeenCalledTimes(1);
    });

});

