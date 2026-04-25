# Instagram Reel Sharer 📸

A simple web app to embed and share Instagram reels with people who don't have an Instagram account. Deploy it on GitHub Pages for free!

## Features

✨ **Share Reels Easily** - Paste an Instagram reel, post, or TV link and get an embeddable version
✨ **No Account Required** - Anyone can view the embedded content
✨ **Copy Embed Code** - Get HTML embed code to use on your own websites
✨ **Mobile Friendly** - Responsive design works on all devices
✨ **Free Hosting** - Deploy directly to GitHub Pages

## How It Works

1. Paste an Instagram reel, post, or TV link
2. The app uses Instagram's official oEmbed API to generate an embed
3. View the preview and copy the embed code
4. Share the page URL or use the embed code on your website

## Supported Links

- Reels: `https://www.instagram.com/reel/XXX/`
- Posts: `https://www.instagram.com/p/XXX/`
- TV: `https://www.instagram.com/tv/XXX/`

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- A GitHub account (for deployment)

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/yourusername/instagram-reel-sharer.git
cd instagram-reel-sharer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment to GitHub Pages

### Step 1: Push to GitHub

1. Create a new repository on GitHub called `instagram-reel-sharer`
2. Push this project to the repository:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/instagram-reel-sharer.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select:
   - **Source**: Deploy from a branch
   - **Branch**: main / docs (or create a GitHub Actions workflow)

### Step 3: Setup GitHub Actions (Automated Deployment)

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Step 4: Access Your App

After deployment, visit: `https://yourusername.github.io/instagram-reel-sharer/`

## Project Structure

```
instagram-reel-sharer/
├── src/
│   ├── App.tsx           # Main app component
│   ├── App.css           # App styles
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling
- **Instagram oEmbed API** - Media embedding

## Important Notes

### About Privacy

- The embedded content respects the original post's privacy settings
- Private accounts will show limited information
- The app uses Instagram's official oEmbed API (no personal credentials needed)

### Limitations

- Some interactive features may not be available in embeds
- Comments are typically read-only in embedded views
- The embed requires an active internet connection to load

### No Backend Required

This app is 100% client-side. It uses Instagram's public oEmbed API and doesn't require:
- Personal Instagram credentials
- Backend server
- API keys
- Database

## Customization

You can customize the app by editing:

- **Colors**: Modify the gradient in `src/App.css` (`.container` class)
- **Text**: Edit strings in `src/App.tsx`
- **Layout**: Adjust CSS in `src/App.css`
- **Base URL**: Change `base` in `vite.config.ts` if deploying to a subdirectory

## Troubleshooting

### Instagram Embed Not Loading
- Check the URL format - it must be a valid Instagram link
- Private accounts may not show content
- Some posts may have embedding disabled by the owner

### GitHub Pages Not Updating
- Wait a few minutes for the GitHub Actions workflow to complete
- Check the "Actions" tab in your repository
- Verify the workflow was triggered by your push

## License

MIT License - feel free to use and modify this project

## Contributing

Found a bug or want to add a feature? Feel free to open an issue or submit a pull request!

## Support

If you have questions or issues, please open an issue on GitHub.

---

Made with ❤️ for sharing Instagram content
