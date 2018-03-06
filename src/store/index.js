import { combineReducers } from "redux";
import counter from "./counter";
import auth from './auth';
import { services } from 'util/feathers';

export default combineReducers({
  counter,
  auth,

  // feathers services
  users: services.users.reducer,
  threads: services.threads.reducer,
  comments: services.comments.reducer,
  topics: services.topics.reducer,
  blog: services.blog.reducer
});
