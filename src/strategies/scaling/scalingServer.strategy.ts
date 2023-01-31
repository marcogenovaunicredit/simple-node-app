import { ScalingStrategies } from "../../types/scalingStrategies";
import { Strategy } from "../basic.strategy";

export class ScalingServerStrategy extends Strategy<void> {
    private masterNodeExecution: Function|undefined;
    private secondaryNodeExecution: Function|undefined;
    private isMasterThreadLogic: Function;

    constructor(isMasterThreadLogic:  Function = () => false, masterNodeExecution: Function|undefined, secondaryNodeExecution: Function|undefined) {
        super(ScalingStrategies.server.toString());
        this.isMasterThreadLogic = isMasterThreadLogic;
        this.masterNodeExecution = masterNodeExecution;
        this.secondaryNodeExecution = secondaryNodeExecution;
    }

    async execute(): Promise<void> {
        if (this.masterNodeExecution && await this.isMasterThreadLogic()) {
            await this.masterNodeExecution();
        } else if (this.secondaryNodeExecution) {
            await this.secondaryNodeExecution();
        }
    }
};
