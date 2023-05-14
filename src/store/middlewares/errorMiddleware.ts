import { Middleware } from 'redux';

const errorMiddleware: Middleware = () => next => action => {
  // If not a promise, continue on
  if (!(action.payload instanceof Promise) || action.skipErrorMiddleware) {
    return next(action);
  }

  // Dispatch initial pending promise, but catch any errors
  return next(action).catch((error: any) => {
    // just skip it
    // console.warn(error);

    return error;
  });
};

export default errorMiddleware;
