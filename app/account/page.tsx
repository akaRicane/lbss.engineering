"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import EnvGetter from "../components/EnvGetter";
import { queryPing } from "../api/aws/engineering-api";
import * as jose from "jose";
import "../styles/page.products.css";

const Account = () => {
  const { getTokenId } = useCoreContext();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userInfos, setUserInfos] = useState({
    email: "not connected",
    username: "not connected",
  });

  const handleOnClickLogin = () => {
    const loginUrl = EnvGetter("ENGINE_API_LOGIN_URL");
    if (loginUrl) {
      window.location.assign(loginUrl);
    }
  };

  useEffect(() => {
    const tokenId = getTokenId();

    if (tokenId) {
      // @ts-ignore
      const decoded = jose.decodeJwt(tokenId);
      const decodedEmail = decoded["email"];
      const decodedUsername = decoded["cognito:username"];
      if (decodedEmail && decodedUsername) {
        const extractedInfos = {
          email: decodedEmail,
          username: decodedUsername,
        };
        // @ts-ignore
        setUserInfos(extractedInfos);
        queryPing(tokenId).then((response) => {
          setIsConnected(response);
        });
      } else {
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, []);

  return (
    <div className="page">
      <p>username: {userInfos.username}</p>
      <p>email: {userInfos.email}</p>
      {isConnected ? (
        <div>
          <p>connected: {isConnected.toString()}</p>
          {/* <p className="break-words text-xs max-w-2xl">Token id: {tokenId ? tokenId : "null"}</p> */}
        </div>
      ) : (
        <div>
          <p>connected: {isConnected.toString()}</p>
          <button onClick={handleOnClickLogin}>login</button>
        </div>
      )}
    </div>
  );
};

export default Account;
