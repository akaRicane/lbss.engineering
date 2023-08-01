"use client";
// page: login

import Link from "next/link";

import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsconfig from "../aws-exports.js";

Amplify.configure(awsconfig);

function login({ signOut, user }: WithAuthenticatorProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/">go home</Link>
      <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default withAuthenticator(login);
