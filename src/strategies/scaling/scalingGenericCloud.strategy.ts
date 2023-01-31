import { ScalingStrategies } from "../../types/scalingStrategies";
import { Strategy } from "../basic.strategy";

export class ScalingGenericCloudStrategy extends Strategy<void> {
    private singleNodeExecution: Function|undefined;

    constructor(singleNodeExecution: Function|undefined) {
        super(ScalingStrategies.cloud);
        this.singleNodeExecution = singleNodeExecution;
    }

    async execute(): Promise<void> {
        if(this.singleNodeExecution) {
            await this.singleNodeExecution();
        }
    }

}