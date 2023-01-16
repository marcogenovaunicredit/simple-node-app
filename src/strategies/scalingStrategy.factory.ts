import { Strategy } from "./basic.strategy";
import { ScalingServerStrategy } from "./scaling/scalingServer.strategy";
import { masterScalingExecution, secondaryScalingExecution, isMasterThread } from "../strategies/scaling/utilities/server";
import { ScalingGenericCloudStrategy } from "./scaling/scalingGenericCloud.strategy";
import { ScalingStrategies } from '../types/scalingStrategies';

export class ScalingStrategyFactory {
    static async getStrategy(strategyCode: string | undefined): Promise<Strategy> {
        switch (strategyCode) {
            case ScalingStrategies.cloud: {
                return new ScalingGenericCloudStrategy(secondaryScalingExecution);
            }
            default: {
                return new ScalingServerStrategy(isMasterThread, masterScalingExecution, secondaryScalingExecution);
            }
        }
    }
}