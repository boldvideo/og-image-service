import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createCanvas, loadImage } from "@napi-rs/canvas";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { text, logo, bg = "white", tc = "black" } = req.query;
    console.log("Query params:", { text, logo, bg, tc });

    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = bg as string;
    ctx.fillRect(0, 0, width, height);

    // Text
    const textContent = (text as string) || "bold.video";
    ctx.fillStyle = tc as string;
    ctx.font = "24px sans-serif";
    ctx.textBaseline = "bottom";
    const padding = 50;
    ctx.fillText(textContent, padding, height - padding);

    // Logo
    if (logo) {
      try {
        const logoImage = await loadImage(logo as string);
        const logoSize = 150;
        ctx.drawImage(
          logoImage,
          width - logoSize - padding,
          height - logoSize - padding,
          logoSize,
          logoSize
        );
      } catch (err) {
        console.error("Failed to load logo:", err);
      }
    }

    // Generate PNG Buffer
    const buffer = canvas.toBuffer("image/png");
    console.log("Buffer size:", buffer.length);

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
