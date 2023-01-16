export abstract class Strategy {
    code: string;

    constructor(code: string) {
        this.code = code;
    }

    abstract execute(): Promise<void>;
}