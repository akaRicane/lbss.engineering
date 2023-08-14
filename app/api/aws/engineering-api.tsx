import EnvGetter from "../../components/EnvGetter";

export const queryPing = async (tokenId: string) => {
  const apiUrl = EnvGetter("ENGINE_API_URL");
  var response = false;

  await fetch(`${apiUrl}/ping`, {
    method: "GET",
    headers: {
      "lbss-cloud-auth-token": tokenId,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const body = JSON.parse(data.body);
      // console.log("Connection", body);
      if (body === "success") {
        response = true;
      }
    });

  return response;
};
