# Deployment Setup (Vercel + GitHub Actions)

This guide shows how to set up automated deployment and Lighthouse testing.

## One-Time Setup

### 1. Deploy to Vercel (First Time)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Import this repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

### 2. Get Vercel Credentials

After first deployment, get these values:

**Vercel Token:**
1. Go to https://vercel.com/account/tokens
2. Create new token
3. Copy the token

**Project IDs:**
Run this command in your terminal (requires Vercel CLI):
```bash
npm install -g vercel
vercel link
```

This creates `.vercel/project.json` with:
- `orgId` (VERCEL_ORG_ID)
- `projectId` (VERCEL_PROJECT_ID)

### 3. Add GitHub Secrets

1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. Add these secrets:

- `VERCEL_TOKEN` - Token from step 2
- `VERCEL_ORG_ID` - orgId from `.vercel/project.json`
- `VERCEL_PROJECT_ID` - projectId from `.vercel/project.json`

### 4. Done!

Now every push to `main` will:
1. Deploy to Vercel
2. Run Lighthouse against deployed site
3. Update `public/lighthouse.json` with score
4. Commit the score back to repo

## How It Works

**GitHub Actions Workflow:** `.github/workflows/deploy-lighthouse.yml`

**Triggers:**
- Push to main branch
- Manual trigger (Actions tab → "Deploy and Lighthouse" → Run workflow)

**Steps:**
1. Checkout code
2. Install dependencies
3. Deploy to Vercel using CLI
4. Wait 30 seconds for deployment to be live
5. Run Lighthouse against https://htsulfuric.com
6. Commit lighthouse.json with new score

## Manual Lighthouse Run

You can still run Lighthouse manually:
```bash
npm run lighthouse
```

This runs against your deployed site (https://htsulfuric.com).

## Troubleshooting

**Workflow fails with "Error: No token found":**
- Check GitHub Secrets are set correctly

**Lighthouse score is 0:**
- Wait a few minutes after deployment
- Site might not be fully ready yet
- Check if https://htsulfuric.com is accessible

**Commit fails:**
- GitHub Actions needs write permissions
- Repo Settings → Actions → General → Workflow permissions → "Read and write permissions"
