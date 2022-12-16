import { cpus } from 'os';

export class OSUtilities {
    constructor(){};

    public static getNumberOfCPUBasic() : number {
        return Math.ceil(cpus().length / 2);
    }
};
