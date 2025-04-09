import './src/config.js';

import http from 'http';
import {app} from './src/app.js';

const port = process.env.PORT || 9000;

const startServer = async () => {
    try {
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`api listening at http://localhost:${port}`, ' pid: ', process.pid);
            console.log(new Date().toLocaleString());
        });
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
};

const start = async () => {
    await startServer();
};


process.nextTick(() => {
    start()
        .then(() => console.log('Server ready!'))
        .catch(console.error);
});