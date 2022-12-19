export class KeepAlive {
    status: ServiceStatus;
    timestamp: String;
    message?: String;

    constructor(status: ServiceStatus, timestamp: String, message?: string) {
        this.status = status;
        this.timestamp = timestamp;
        this.message = message;
    }
}

export enum ServiceStatus {
    NOT_ACTIVE,
    ACTIVE
    
}