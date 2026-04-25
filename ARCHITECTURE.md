# Technical Architecture

## Overview

Instagram Reel Sharer is a client-side React web application that uses Instagram's public oEmbed API to embed media content. It requires no backend server or personal credentials.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (React)                   │
│  - URL input form                                           │
│  - Validation logic                                         │
│  - Embed display component                                  │
│  - Copy-to-clipboard functionality                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    URL Form Submission
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│              Instagram oEmbed API Endpoint                  │
│            https://www.instagram.com/oembed                 │
│                                                              │
│  Input: Instagram URL (reel, post, or TV)                  │
│  Output: HTML embed code + metadata                         │
└──────────────────────────┬───────────────────────────────────┘
                           │
                Response with embed HTML
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    Display & Copy Functions                 │
│  - Render embedded content                                  │
│  - Allow users to copy code                                 │
│  - Show validation errors                                   │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18** - UI library for components and state management
- **TypeScript** - Type checking and better development experience
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with responsive design

### Deployment
- **GitHub Pages** - Free static hosting
- **GitHub Actions** - Automated build and deployment pipeline

### External APIs
- **Instagram oEmbed API** - Public API for embed generation (no authentication required)

## How It Works

### 1. User Input
```typescript
User enters Instagram URL → Form input element → State update (instagramUrl)
```

### 2. Validation
```typescript
Regex pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+(\?.*)?$/

Validates:
- Correct domain (instagram.com)
- Correct path (p, reel, or tv)
- Valid URL format
```

### 3. API Request
```typescript
Endpoint: https://www.instagram.com/oembed/
Method: GET via Fetch API
Parameters: 
  - url: encodeURIComponent(instagramUrl)

CORS: Handled by browser (Instagram's server allows it)
```

### 4. Response Processing
```typescript
Success Response:
{
  "url": "https://www.instagram.com/reel/...",
  "html": "<blockquote class=\"instagram-media\">...</blockquote>...",
  "width": 550,
  "height": 617,
  "type": "rich",
  "version": "1.0"
}

The HTML is then rendered using dangerouslySetInnerHTML
```

### 5. Display & Interaction
- Preview shows the embedded media
- Users can copy the HTML code
- Code is stored in a textarea for copying

## Security Considerations

### ✅ What's Secure

1. **No Backend Authentication**
   - No personal Instagram credentials stored
   - No API keys exposed
   - No backend vulnerabilities

2. **Client-Side Only**
   - All processing happens in the browser
   - No sensitive data sent to servers
   - No database to breach

3. **Uses Public APIs**
   - Instagram's public oEmbed endpoint
   - No private/restricted endpoints
   - Follows Instagram's terms

4. **CORS Safe**
   - Cross-Origin Resource Sharing is enabled for oEmbed endpoint
   - Browser handles CORS security

### ⚠️ Important Notes

1. **Privacy Respect**
   - Respects original post's privacy settings
   - Private accounts show limited info
   - Public content only

2. **No Personal Data**
   - Only handles public Instagram URLs
   - No user authentication
   - No cookies or tracking (except GitHub analytics)

3. **oEmbed API Limitations**
   - Instagram may rate-limit requests
   - Some old content may not have embed support
   - Private accounts restrict embed data

## File Structure

```
instagram-reel-sharer/
├── src/
│   ├── App.tsx              # Main component
│   │   ├── validateInstagramUrl()    # URL validation
│   │   ├── generateEmbedCode()       # API call & processing
│   │   └── JSX rendering
│   ├── App.css              # Component styles
│   ├── index.css            # Global styles
│   └── main.tsx             # React DOM render
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions workflow
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies & scripts
└── README.md                # Documentation
```

## API Usage

### Instagram oEmbed Endpoint

```
GET https://www.instagram.com/oembed/
```

**Parameters:**
- `url` (required): Instagram URL to embed

**Response (200 OK):**
```json
{
  "url": "https://www.instagram.com/reel/...",
  "html": "<blockquote>...</blockquote><script async src=\"...\"></script>",
  "width": 550,
  "height": 617,
  "type": "rich",
  "version": "1.0",
  "title": "Post by @username"
}
```

**Error Handling:**
- 404: Invalid URL
- 403: Embedding disabled or private account
- CORS error: Browser security restriction

## Build & Deployment Process

### Development
```bash
npm install       # Install dependencies
npm run dev       # Start dev server on http://localhost:5173
```

### Production Build
```bash
npm run build     # Outputs to dist/ folder with optimizations:
                  # - Minified JS/CSS
                  # - Tree shaking
                  # - Code splitting
                  # - Source maps (optional)
```

### GitHub Pages Deployment
```
1. Build complete → dist/ folder created
2. GitHub Actions: peaceiris/actions-gh-pages
3. Resets or syncs gh-pages branch
4. GitHub Pages serves dist/ contents
5. Available at: https://username.github.io/instagram-reel-sharer/
```

## Performance Characteristics

### Load Time
- Initial load: ~100-200ms (depends on network)
- Embed images: ~500ms-2s (depends on Instagram's CDN)

### Bundle Size
- Vite optimizes bundle to ~50-100KB (gzipped)
- Minimal dependencies
- Good for GitHub Pages free tier

### API Rate Limiting
- Instagram oEmbed endpoint: Not heavily rate-limited for public usage
- Recommended: Don't make more than 1 request per second
- Long-term heavy use may get temporarily throttled

## Error Handling

### URL Validation Errors
```typescript
- Empty URL → "Please enter an Instagram URL"
- Invalid format → "Invalid Instagram URL..."
```

### API Errors
```typescript
- Network error → Fallback iframe embed
- 404 (Invalid URL) → API error message
- 403 (Private account) → API error message
```

## Future Enhancements

Potential improvements:
- [ ] Support for Instagram Stories
- [ ] Hashtag/location lookups
- [ ] Dark mode support
- [ ] Multiple embed layout options
- [ ] Social media sharing buttons
- [ ] Analytics tracking
- [ ] Browser extension version

## Maintenance

### Dependencies Updates
```bash
npm outdated              # Check for updates
npm update               # Update packages
npm run build           # Rebuild to test
```

### GitHub Actions Updates
- Workflow file monitored for breaking changes
- Node.js version pinned to 18 for stability
- peaceiris/actions-gh-pages maintained by community

## Resources

- [Instagram oEmbed Documentation](https://developers.instagram.com/docs/instagram-api/reference/ig-media/media_product_type)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
