import { port } from './configs';
import { startServer } from './server';

startServer()
    .then((app: any) => {
        const hostname = '0.0.0.0';
        app.listen(port, hostname, () => console.log(`Listening on ${hostname}:${port}`));
        console.log('Server successfully started');
    })
    .catch((error: Error) => {
        console.error('Server failed on startup', error);
    });
