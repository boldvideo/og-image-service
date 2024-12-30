import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createCanvas, loadImage } from "@napi-rs/canvas";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text, logo, bg = "white", tc = "black" } = req.query;

  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bg as string;
  ctx.fillRect(0, 0, width, height);

  // Text
  ctx.fillStyle = tc as string;
  ctx.font = "48px system-ui";
  ctx.textAlign = "left";
  const padding = 50;
  ctx.fillText((text as string) || "Default Text", padding, height - padding);

  // Logo (if provided)
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

  // Send the image buffer as a response
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
}
