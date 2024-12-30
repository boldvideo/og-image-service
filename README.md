# OG Image Generator

Simple, fast, and customizable Open Graph image generator. Used in production at [Bold Video](https://bold.video).

## What it does

Generates dynamic social media preview images with:

- Custom text
- Logo placement
- Background colors
- Text colors

## Usage

`GET /api/og-image`
Query params:

- `text`: Text to display
- `logo`: URL of logo image
- `bg`: Background color (hex or name)
- `tc`: Text color (hex or name)

## Example

`GET /api/og-image?text=Hello%20World&logo=https://bold.video/logo.png&bg=white&tc=black`

# Deploy your own

One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/boldvideo/og-image-service)

Or manual deploy:

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` for development
4. Run `npm run build && npm start` for production

## Credits

Built and maintained by [Marcel Fahle](https://marcelfahle.net). Originally created for [Bold Video](https://bold.video).

## License

MIT
