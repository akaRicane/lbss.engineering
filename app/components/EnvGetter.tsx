const EnvGetter = (query: string) => {
  var answer: string | undefined = "null";

  if (process.env.NODE_ENV === "development") {
    answer = process.env.ENGINE_API_LOGIN_URL_DEV;
  } else {
    answer = process.env.ENGINE_API_LOGIN_URL_PROD;
  }

  console.log(`Query ENV ${query} -> ${answer}`);
  return answer;
};

export default EnvGetter;
