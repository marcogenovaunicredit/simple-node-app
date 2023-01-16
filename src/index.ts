import { ScalingServerStrategy } from './strategies/scaling/scalingServer.strategy';
import {masterScalingExecution, secondaryScalingExecution, isMasterThread } from "./strategies/scaling/utilities/server";

//TODO define a abstract logic to define the usage of cluster or not (e.g. kubernetes approach
let scalingServerStrategy: ScalingServerStrategy = new ScalingServerStrategy(isMasterThread, masterScalingExecution, secondaryScalingExecution);
scalingServerStrategy.execute();