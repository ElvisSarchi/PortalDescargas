import { defineMiddleware } from "astro:middleware";
export const onRequest = defineMiddleware(({ locals, request }, next) => {
  //crear una valdacion de token
  console.log(locals);
  locals.name = "jose";
  return next();
});
