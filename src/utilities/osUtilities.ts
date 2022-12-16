import os from 'os';

export class OSUtilities {
    constructor(){};

    public static getNumberOfCPUBasic() : number {
        return Math.ceil(os.cpus().length / 2);
    }
};
