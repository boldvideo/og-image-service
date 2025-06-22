import React from "react";
import { ImageResponse } from "@vercel/og";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "edge",
};

// Bold logo URL - using the hosted version
const boldLogoUrl = "https://raw.githubusercontent.com/boldvideo/og-image-service/main/img/bold-logo-on-white.png";

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
            backgroundColor: bg,
            fontFamily: "Inter, sans-serif",
            padding: "30px",
          }}
        >
          {/* Main content area */}
          <div
            style={{
              flex: img ? "0 0 60%" : "1",
              backgroundColor: "white",
              border: "3px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "50px",
              paddingBottom: "40px",
            }}
          >
            {/* Top section with length badge and text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: "1 1 auto" }}>
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
                  fontSize: img ? 64 : 72, 
                  fontWeight: "bold",
                  color: tc,
                  lineHeight: 1.2,
                  marginTop: "10px",
                  paddingBottom: "10px",
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
                    width="100"
                    height="100"
                    style={{ objectFit: "contain" }}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {url && (
                    <div style={{ fontSize: 20, color: tc }}>
                      {url}
                    </div>
                  )}
                  {date && (
                    <div style={{ fontSize: 20, color: tc, opacity: 0.7 }}>
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
                border: "3px solid black",
                borderLeft: "none",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
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
              <img
                src={boldLogoUrl}
                style={{
                  position: "absolute",
                  bottom: "40px",
                  right: "40px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                }}
              />
            </div>
          ) : (
            /* Bold logo when no image */
            <img
              src={boldLogoUrl}
              style={{
                position: "absolute",
                bottom: "60px",
                right: "60px",
                width: "100px",
                height: "100px",
                borderRadius: "8px",
              }}
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
