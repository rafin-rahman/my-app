"use client";
import { useState } from "react";

export default function () {
  const [label, setLabel] = useState("Nothing yet");
  async function btnHandler() {
    try {
      const response = await fetch("/api/modifyPdf", {
        method: "POST",
      });

      const responseData = await response.json();
      if (responseData) {
        setLabel(responseData.message);
      }
    } catch (error) {
      console.log("Error modifying PDF", error);
    }
  }

  return (
    <>
      This is page page
      <br />
      <button
        onClick={() => {
          btnHandler();
        }}
      >
        Click here to generate a PDF
        <br />
        {label}
      </button>
    </>
  );
}
