import reduxifyServices from 'feathers-redux';

export default (app) => {
  const serviceNames = ['blog', 'users', 'threads', 'topics', 'comments']
  const services = reduxifyServices(app, serviceNames);
  return services;
};