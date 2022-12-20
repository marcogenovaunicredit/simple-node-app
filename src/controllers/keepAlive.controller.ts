import express from 'express';
import { KeepAlive } from '../models/keepAlive.model';
import keepaliveService from '../services/keepAlive.service';

class KeepAliveController {

    async keepAlive(req: express.Request, res: express.Response) {
        let keepAliveDto: KeepAlive = await keepaliveService.executeKeepAlive();
        res.status(200).send(keepAliveDto);
    }
}

export default new KeepAliveController();