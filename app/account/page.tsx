"use client";

import { useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import "../styles/page.products.css";

const Account = () => {
  const { tokenId } = useCoreContext();

  return (
    <div className="page">
      <p>Token id: {tokenId ? tokenId : "null"}</p>
    </div>
  );
};

export default Account;
