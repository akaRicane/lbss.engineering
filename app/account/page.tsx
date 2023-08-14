"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import EnvGetter from "../components/EnvGetter";
import { queryPing } from "../api/aws/engineering-api";
import * as jose from "jose";
import "../styles/page.account.css";

const Account = () => {
  const { getTokenId, updateTokenId } = useCoreContext();
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

  const handleOnClickLogout = () => {
    const logoutUrl = EnvGetter("ENGINE_API_LOGOUT_URL");
    // @ts-ignore
    // fetch(logoutUrl, {
    //   method: "GET",
    //   headers: {
    //     "lbss-cloud-auth-token": getTokenId(),
    //   },
    // });
    handleOnClickLogin();
    // window.location.assign(logoutUrl);
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
        <p className="account-info">{userInfos.username}</p>
        <p className="account-labels">email</p>
        <p className="account-info">{userInfos.email}</p>
        <p className="account-labels">connected</p>
        <p className="account-info">{isConnected.toString()}</p>
        {isConnected ? (
          <div className="login-button">
            <button onClick={handleOnClickLogout}>logout</button>
          </div>
        ) : (
          <div className="login-button">
            <button onClick={handleOnClickLogin}>login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
