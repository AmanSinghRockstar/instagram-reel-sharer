# Deployment Guide: GitHub Pages Setup

This guide walks you through deploying your Instagram Reel Sharer to GitHub Pages.

## Prerequisites

- Node.js 16+ installed on your computer
- A GitHub account
- Git installed

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top-right corner
3. Select "New repository"
4. Name it `instagram-reel-sharer`
5. Choose "Public" (so it can be hosted on GitHub Pages)
6. Click "Create repository"

### 2. Initialize Local Git Repository

Open PowerShell/Terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/instagram-reel-sharer.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages with Actions

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Source", select "Deploy from a branch"
5. Select branch: **main**
6. Select folder: **/root** (if only `.github` folder shows, this will work too)
7. Click **Save**

> Note: The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy your site.

### 4. Trigger the Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
1. Build your project
2. Deploy it to GitHub Pages

To check the deployment status:
1. Go to your repository
2. Click the **Actions** tab
3. Look for the latest workflow run
4. It should show as ✅ if successful

### 5. View Your Live Site

Once the deployment is complete, your site will be available at:

```
https://YOUR_USERNAME.github.io/instagram-reel-sharer/
```

This may take a few minutes after the first deployment.

## Automatic Deployment with GitHub Actions

The workflow file `.github/workflows/deploy.yml` handles everything automatically:
- ✅ Installs dependencies (`npm install`)
- ✅ Builds the project (`npm run build`)
- ✅ Deploys to GitHub Pages

**No manual build steps needed!** Just push code to `main` and it deploys automatically.

## Updating Your Site

After the initial deployment, any changes you push to the `main` branch will automatically redeploy:

```bash
# Make changes, then:
git add .
git commit -m "Your changes"
git push
```

The site will be updated within a few minutes.

## Custom Domain (Optional)

To use a custom domain instead of `github.io`:

1. In your repository **Settings > Pages**
2. Under "Custom domain", enter your domain name
3. Add DNS records to your domain provider
4. Follow the instructions to verify

## Troubleshooting

### Site Not Showing Up

- **Wait a few minutes** - GitHub Pages can take 5-10 minutes for the first deployment
- **Check Actions tab** - Verify the workflow completed successfully
- **Clear browser cache** - Hard refresh (Ctrl+Shift+R on Windows)

### 404 Error

- Verify the URL is `https://YOUR_USERNAME.github.io/instagram-reel-sharer/`
- Check that GitHub Pages is enabled in Settings
- Confirm the workflow shows as successful

### Changes Not Updating

- Push to the `main` branch: `git push`
- Wait for the GitHub Actions workflow to complete
- Check the Actions tab for any errors
- Hard refresh your browser (Ctrl+Shift+R)

### Build Fails

Check the Actions tab for error messages. Common issues:
- Missing `npm install` step
- Node.js version mismatch
- Syntax errors in code

## Need Help?

1. Check the main [README.md](./README.md)
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check the [Actions tab](../../actions) for workflow logs

---

Happy sharing! 🎉
