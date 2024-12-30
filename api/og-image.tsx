import React from "react";
import { ImageResponse } from "@vercel/og";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "edge",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const searchParams = new URL(req.url!, "http://localhost:3000")
      .searchParams;
    const text = searchParams.get("text");
    const logo = searchParams.get("logo");
    const bg = searchParams.get("bg") || "white";
    const tc = searchParams.get("tc") || "black";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "50px",
            backgroundColor: bg,
            color: tc,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: "bold" }}>
            {text || "bold.video"}
          </div>
          {logo && (
            <img
              src={logo}
              width="150"
              height="150"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
    });
  }
}
