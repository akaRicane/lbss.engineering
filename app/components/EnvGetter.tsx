const EnvGetter = (query: string): string | undefined => {
  var answer: string | undefined = "null";

  if (query === "ENGINE_API_LOGIN_URL" && process.env.NODE_ENV === "development") {
    answer = process.env.ENGINE_API_LOGIN_URL_DEV;
  } else if (query === "ENGINE_API_LOGIN_URL" && process.env.NODE_ENV === "production") {
    answer = process.env.ENGINE_API_LOGIN_URL_PROD;
  } else if (query === "ENGINE_API_URL") {
    answer = process.env.ENGINE_API_URL;
  } else if (query === "ENGINE_API_LOGOUT_URL" && process.env.NODE_ENV === "development") {
    answer = process.env.ENGINE_API_LOGOUT_URL_DEV;
  } else if (query === "ENGINE_API_LOGOUT_URL" && process.env.NODE_ENV === "production") {
    answer = process.env.ENGINE_API_LOGOUT_URL_PROD;
  } else if (query === "APP_VERSION") {
    answer = process.env.APP_VERSION;
  }

  // console.log(`Query ENV ${query} -> ${answer}`);
  return answer;
};

export default EnvGetter;
