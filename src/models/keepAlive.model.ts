import { ServiceStatus } from "./serviceStatus.enum";

/**
 * @openapi
 * components:
 *  schemas:
 *   keep-alive:
 *       type: object
 *       required:
 *         - status
 *         - timestamp
 *       properties:
 *         status:
 *           type: string
 *           description: The status of the microservices deployed
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the check
 *         message:
 *           type: string
 *           description: optional message related to the checks
 *       example:
 *         status: 1
 *         timestamp: 2023-01-13T10:27:03.645Z
 *         message: not real checks on interfaces
 */
export class KeepAlive {
    public status!: ServiceStatus;
    public timestamp!: String;
    public message?: String;
}
