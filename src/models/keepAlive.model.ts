export interface KeepAlive {
    status: ServiceStatus;
    timestamp: String;
    message?: String;
}

export enum ServiceStatus {
    NOT_ACTIVE,
    ACTIVE
    
}