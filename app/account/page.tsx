"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import EnvGetter from "../components/EnvGetter";
import { queryPing } from "../api/aws/engineering-api";
import * as jose from "jose";
import "../styles/page.account.css";

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
    <div className="vertical-fade-animation">
      <div className="account-body">
        <p className="account-labels">username</p>
        <p className="account-labels">{userInfos.username}</p>
        <p className="account-labels">email</p>
        <p className="account-labels">{userInfos.email}</p>
        <p className="account-labels">connected</p>
        <p className="account-labels">{isConnected.toString()}</p>
        {isConnected ? (
          <div>{/* <p className="break-words text-xs max-w-2xl">Token id: {tokenId ? tokenId : "null"}</p> */}</div>
        ) : (
          <div>
            <button className="login-button" onClick={handleOnClickLogin}>
              login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
