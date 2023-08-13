"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import EnvGetter from "../components/EnvGetter";
import "../styles/page.products.css";

const Account = () => {
  const { tokenId } = useCoreContext();
  const [isConnected, setIsConnected] = useState(false);

  const handleOnClickLogin = () => {
    const loginUrl = EnvGetter("ENGINE_API_LOGIN_URL");

    if (loginUrl) {
      window.location.assign(loginUrl);
    } else {
      console.error("ENGINE_API_LOGIN_URL is not defined in the environment variables.");
    }
  };

  useEffect(() => {
    const apiUrl = EnvGetter("ENGINE_API_URL");

    if (tokenId) {
      // console.log(`Fetching ${apiUrl}/ping`);
      fetch(`${apiUrl}/ping`, {
        method: "GET",
        headers: {
          "lbss-cloud-auth-token": tokenId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const body = JSON.parse(data.body);
          // console.log("Connection", body);
          if (body !== "success") {
            setIsConnected(false);
          } else {
            setIsConnected(true);
          }
        });
    } else {
      console.log("no token id, ping not sent");
      setIsConnected(false);
    }
  }, [isConnected, tokenId]);

  return (
    <div className="page">
      {isConnected ? (
        <p className="break-words text-xs max-w-2xl">Token id: {tokenId ? tokenId : "null"}</p>
      ) : (
        <div>
          <button onClick={handleOnClickLogin}>login</button>
          <p>Not connected</p>
        </div>
      )}
    </div>
  );
};

export default Account;
