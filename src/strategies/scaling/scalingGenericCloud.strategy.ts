import { Strategy } from "../basic.strategy";

export class ScalingGenericCloudStrategy extends Strategy {
    private singleNodeExecution: Function|undefined;

    constructor(singleNodeExecution: Function|undefined) {
        super("SCALING_CLOUD");
        this.singleNodeExecution = singleNodeExecution;
    }

    async execute(): Promise<void> {
        if(this.singleNodeExecution) {
            await this.singleNodeExecution();
        }
    }

}