"use client";

import { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import "../styles/page.products.css";
import * as jose from "jose";

function CallbackPage() {
  const { updateTokenId } = useCoreContext();
  const [status, setStatus] = useState<string>("connecting ...");

  useEffect(() => {
    // Get the hash fragment from the URL
    const splitList = window.location.hash.substring(1).split("&");
    if (splitList.length === 4) {
      const idTokenFragment = splitList[0];
      if (idTokenFragment !== undefined) {
        const idToken = idTokenFragment.replace("id_token=", "");
        updateTokenId(idToken);
        setStatus(idToken ? "success! redirects ..." : "fail");
      }
    } else {
      setStatus("connection failed!");
    }
    setTimeout(() => {
      window.location.assign("/account");
    }, 2000);
  }, [updateTokenId]);

  return (
    <div className="page">
      <p>{status}</p>
    </div>
  );
}

export default CallbackPage;
