"use client";

import { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import "../styles/page.products.css";

function CallbackPage() {
  const { tokenId, updateTokenId } = useCoreContext();
  const [status, setStatus] = useState<string>("connecting ...");

  useEffect(() => {
    // Get the hash fragment from the URL
    setStatus(tokenId ? tokenId : "null");
    const splitList = window.location.hash.substring(1).split("&");
    if (splitList.length === 4) {
      const idTokenFragment = splitList[0]; // Access the element at index 0
      if (idTokenFragment !== undefined) {
        const idToken = idTokenFragment.replace("id_token=", "");
        console.log("idToken: ", idToken);
        updateTokenId(idToken);
        setStatus(idToken ? "connected" : "fail");
      }
    } else {
      console.log(tokenId);
      setStatus("connection failed!");
    }
  }, [tokenId, updateTokenId]);

  return (
    <div className="page">
      <p>{status}</p>
    </div>
  );
}

export default CallbackPage;
