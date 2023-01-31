export abstract class Strategy<Type> {
    code: string;

    constructor(code: string) {
        this.code = code;
    }

    abstract execute(): Promise<Type>;

    async getCode (): Promise<string> {
        return this.code;
    }
}