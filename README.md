# OG Image Generator

Simple, fast, and customizable Open Graph image generator. Used in production at [Bold Video](https://bold.video).

## What it does

Generates dynamic social media preview images with:

- Custom text and video duration badges
- Logo placement with URL and date information
- Background colors and text colors
- Optional image/thumbnail display with Bold logo overlay
- Professional layout optimized for social media sharing

## Usage

`GET /api/og-image`
Query params:

- `text`: Text to display (optional, defaults to "bold.video")
- `logo`: URL of logo image (optional)
- `bg`: Background color (optional, defaults to "#41C6A6" - mint)
- `tc`: Text color (optional, defaults to "black")
- `l`: Video length string, e.g. "08:24" (optional)
- `url`: URL to display at bottom (optional)
- `date`: Date string to display (optional)
- `img`: Background image URL for right side (optional)

## Examples

Basic example:
`GET /api/og-image?text=Hello%20World&logo=https://bold.video/logo.png&bg=white&tc=black`

Full example with all parameters:
`GET /api/og-image?text=Revolutionizing%20Archaeology%20with%20Digital%20Tools&l=08:24&logo=https://example.com/tale-logo.png&url=tale.bold.video&date=JUN%2021%202025&img=https://example.com/thumbnail.jpg`

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
