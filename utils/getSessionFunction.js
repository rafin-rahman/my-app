"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function session() {
  const [mySession, setMySession] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      setMySession(session);
    });
  }, []);

  return mySession;
}
