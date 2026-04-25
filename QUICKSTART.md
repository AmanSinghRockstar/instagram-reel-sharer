# Quick Start Guide

Get your Instagram Reel Sharer up and running in 5 minutes!

## Prerequisites

Make sure you have:
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **npm** - Comes with Node.js

## Development Setup (Local Testing)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

You should see something like:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/instagram-reel-sharer/
```

Open the URL in your browser to see the app!

### 3. Test the App

1. Go to Instagram and copy a reel link, e.g.: `https://www.instagram.com/reel/ABC123/`
2. Paste it into the app
3. Click "Embed Reel"
4. See the reel preview!

## Production Build

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready to deploy.

### Test Production Build Locally

```bash
npm run preview
```

This runs your production build locally so you can test it before deploying.

## Deploy to GitHub Pages

See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed deployment instructions.

**Quick Summary:**
1. Create a GitHub repo called `instagram-reel-sharer`
2. Push your code: `git push`
3. Enable Pages in repo Settings
4. Done! Your site is live at: `https://YOUR_USERNAME.github.io/instagram-reel-sharer/`

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Build for production (creates `dist/` folder) |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── App.tsx       # Main component with reel embedding logic
├── App.css       # App styling
├── index.css     # Global styles
└── main.tsx      # React entry point

index.html        # HTML template
vite.config.ts    # Vite configuration
package.json      # Dependencies
```

## What the App Does

1. **Accepts Instagram URLs** - Users paste any Instagram reel/post/TV link
2. **Validates URL** - Checks if it's a valid Instagram link
3. **Fetches Embed Data** - Uses Instagram's oEmbed API
4. **Displays Preview** - Shows the embedded reel
5. **Provides Embed Code** - Users can copy HTML code to use elsewhere

## Key Features Explained

### 🔗 URL Validation
The app validates Instagram URLs to ensure they're in the correct format before attempting to embed.

### 🖼️ Embed Preview
Shows what the embedded reel looks like directly on the page.

### 📋 Copy Embed Code
Users can copy the HTML embed code to use on their own websites.

### 📱 Responsive Design
Works on desktop, tablet, and mobile devices.

## Limitations & Notes

⚠️ **Important:**
- Private Instagram accounts may show limited information
- Some accounts have embedding disabled
- The app requires an internet connection
- Works with Instagram's public oEmbed API (no authentication needed)

## Customization

Want to change colors, text, or layout?

1. **Colors** - Edit `src/App.css` (look for `linear-gradient`)
2. **Text** - Edit `src/App.tsx` (HTML/JSX content)
3. **Layout** - Modify CSS in `src/App.css`
4. **Icons** - Replace emojis in `src/App.tsx`

## Troubleshooting

### "npx: not found" or "npm: not found"
- You need to install Node.js: https://nodejs.org/
- Restart your terminal after installation

### Port 5173 already in use
- Run `npm run dev -- --port 3000` to use a different port

### GitHub Pages not showing changes
- Wait 5-10 minutes after pushing
- Hard refresh your browser (Ctrl+Shift+R)
- Check the Actions tab for deployment status

### Reel not embedding
- Check the URL format is correct
- Try a different public reel
- Some accounts disable embedding

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run locally: `npm run dev`
3. ✅ Test with a reel link
4. ✅ Build: `npm run build`
5. ✅ Deploy to GitHub Pages (see GITHUB_PAGES_SETUP.md)

Need help? Check the [README.md](./README.md) for more details!
