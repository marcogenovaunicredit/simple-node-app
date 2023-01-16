import { Strategy } from "../basic.strategy";

export class ScalingServerStrategy extends Strategy {
    private masterNodeExecution: Function|undefined;
    private secondaryNodeExecution: Function|undefined;
    private isMasterThreadLogic: Function;

    constructor(isMasterThreadLogic:  Function = () => false, masterNodeExecution: Function|undefined, secondaryNodeExecution: Function|undefined) {
        super("SCALING_SERVER");
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
