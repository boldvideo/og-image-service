import React from "react";
import { ImageResponse } from "@vercel/og";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "edge",
};

const boldLogoSvg = `<svg width="135" height="127" viewBox="0 0 135 127" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="135" height="127" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31 105L31 21L72.9742 21C91.0994 21 98.8674 30.6042 98.8674 42.2664C98.8674 51.459 96.0055 58.4563 90.0092 62.984C100.094 65.7281 105 75.3323 105 86.5829C105 93.1458 103.632 99.8368 99.1436 105L31 105Z" fill="#41C6A6"/>
</svg>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const searchParams = new URL(req.url!, "http://localhost:3000")
      .searchParams;
    const text = searchParams.get("text");
    const logo = searchParams.get("logo");
    const bg = searchParams.get("bg") || "#41C6A6";
    const tc = searchParams.get("tc") || "black";
    const length = searchParams.get("l");
    const url = searchParams.get("url");
    const date = searchParams.get("date");
    const img = searchParams.get("img");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#41C6A6",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {/* Main content area */}
          <div
            style={{
              flex: img ? "0 0 60%" : "1",
              backgroundColor: bg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "60px",
            }}
          >
            {/* Top section with length badge */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {length && (
                <div
                  style={{
                    backgroundColor: "#FFC947",
                    color: "black",
                    padding: "10px 24px",
                    borderRadius: "50px",
                    fontSize: "32px",
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                  }}
                >
                  {length}
                </div>
              )}
              
              {/* Main text */}
              <div 
                style={{ 
                  fontSize: 72, 
                  fontWeight: "bold",
                  color: tc,
                  lineHeight: 1.1,
                  marginTop: "20px",
                }}
              >
                {text || "bold.video"}
              </div>
            </div>

            {/* Bottom section with logo, url, and date */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
                {logo && (
                  <img
                    src={logo}
                    width="120"
                    height="120"
                    style={{ objectFit: "contain" }}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {url && (
                    <div style={{ fontSize: 24, color: tc }}>
                      {url}
                    </div>
                  )}
                  {date && (
                    <div style={{ fontSize: 24, color: tc, opacity: 0.7 }}>
                      {date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Image area */}
          {img ? (
            <div
              style={{
                flex: "1",
                backgroundColor: "black",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Bold logo overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  right: "40px",
                  width: "100px",
                  height: "100px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#41C6A6",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          ) : (
            /* Bold logo when no image */
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "100px",
                height: "100px",
                backgroundColor: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#41C6A6",
                  borderRadius: "8px",
                }}
              />
            </div>
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
