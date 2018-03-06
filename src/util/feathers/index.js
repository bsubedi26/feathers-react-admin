import feathers from '@feathersjs/client/dist/feathers.min';
import auth from '@feathersjs/client/dist/authentication.min';
import fSocketio from '@feathersjs/client/dist/socketio.min';
import io from 'socket.io-client';
// import fRest from '@feathersjs/client/dist/rest';
import reduxifyAllServices from './redux-services';


const HOST = 'http://localhost:3030'
const socket = io(HOST);
// const rest = fRest(HOST);

const app = feathers()
  .configure(fSocketio(socket))
  // .configure(rest.fetch(window.fetch.bind(window)))
  .configure(auth({
    storage: window.localStorage
  }));


app.io.on('connect_error', error => {
  console.log('Could not connect to server. Closing socket connection.');
  app.io.close();
})

const services = reduxifyAllServices(app);
export { services };
export default app;