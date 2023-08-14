const EnvGetter = (query: string) => {
  var answer: string | undefined = "null";

  if (query === "ENGINE_API_LOGIN_URL" && process.env.NODE_ENV === "development") {
    answer = process.env.ENGINE_API_LOGIN_URL_DEV;
  } else if (query === "ENGINE_API_LOGIN_URL" && process.env.NODE_ENV === "production") {
    answer = process.env.ENGINE_API_LOGIN_URL_PROD;
  } else if (query === "ENGINE_API_URL") {
    answer = process.env.ENGINE_API_URL;
  }

  // console.log(`Query ENV ${query} -> ${answer}`);
  return answer;
};

export default EnvGetter;
