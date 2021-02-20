import { port } from './configs';
import { startServer } from './server';

startServer()
    .then((app: any) => {
        app.listen(port, () => console.log(`Listening on ${port}`));
        console.log('Server successfully started');
    })
    .catch((error: Error) => {
        console.error('Server failed on startup', error);
    });
