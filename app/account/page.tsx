"use client";

import { useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import EnvGetter from "../components/EnvGetter";
import "../styles/page.products.css";

const Account = () => {
  const { tokenId } = useCoreContext();

  useEffect(() => {
    const apiUrl = EnvGetter("ENGINE_API_URL");
    if (tokenId) {
      console.log(`${apiUrl}/ping`, tokenId);
      fetch(`${apiUrl}/ping`, {
        method: "GET",
        headers: {
          "lbss-cloud-auth-token": tokenId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("no tokenid, ping not sent");
    }
  }, [tokenId]);

  return (
    <div className="page">
      <p>Token id: {tokenId ? tokenId : "null"}</p>
    </div>
  );
};

export default Account;
