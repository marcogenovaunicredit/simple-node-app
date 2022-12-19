export class TimeUtilities {
    constructor(){};

    public static getTimestampAsString() : String {
        return new Date().toISOString();
    }
};
