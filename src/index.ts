import cluster from 'cluster';
import http from 'http';
import { OSUtilities } from './utilities/osUtilities'

const numberOfCores = OSUtilities.getNumberOfCPUBasic();

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} started`);
    for (let i = 0; i < numberOfCores; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} stopped working`);
        cluster.fork();
    });
    cluster.on('fork', (worker) => {
        console.log(`Worker ${worker.process.pid} started`);
    });

} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Process ${process.pid} says hello!`);
    }).listen(8000);
}