# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Open Graph (OG) image generator service that creates dynamic social media preview images. It's deployed as a Vercel Edge Function and used in production by Bold Video.

## Architecture

- **Serverless Edge Function**: Single endpoint at `/api/og-image` using Vercel's Edge Runtime
- **Image Generation**: Uses `@vercel/og` with React components to compose images
- **Standard OG Dimensions**: Always generates 1200x630 pixel images
- **Production Service**: This is a live service, ensure changes maintain backward compatibility

## Development Commands

Note: The README references these commands but they're not defined in package.json. You may need to add them:
```bash
# Development
npm run dev

# Production build and start
npm run build && npm start
```

For Vercel deployment:
```bash
vercel dev  # Local development
vercel     # Deploy to preview
vercel --prod  # Deploy to production
```

## API Specification

**Endpoint**: `GET /api/og-image`

**Query Parameters**:
- `text`: Display text (optional, defaults to "bold.video")
- `logo`: Logo image URL (optional)
- `bg`: Background color (optional, defaults to "white") 
- `tc`: Text color (optional, defaults to "black")

**Response**: PNG image (1200x630 pixels)

## Key Implementation Details

1. **React for Image Composition**: The image layout is defined using React JSX in `api/og-image.tsx`
2. **Edge Runtime**: Uses `export const runtime = 'edge'` for optimal performance
3. **Error Handling**: Returns 500 status with error message on failure
4. **Layout**: Flexbox layout with text on left, optional logo on right

## Important Considerations

- This is a production service - maintain API compatibility
- Image dimensions (1200x630) are standard for OG images - don't change
- Keep dependencies minimal for edge runtime performance
- The service is stateless - no database or file storage
- All customization happens via query parameters

## Current Limitations

- No test suite exists
- No linting or formatting configuration
- npm scripts are not defined in package.json despite README references