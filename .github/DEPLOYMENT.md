# Deployment Setup (Vercel Native + GitHub Actions Lighthouse)

**Architecture:** Vercel handles deployment, GitHub Actions handles Lighthouse testing.

This is **simpler and more secure** than managing Vercel tokens in GitHub Actions.

---

## One-Time Setup (5 Minutes)

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Import this repository (`my-nextjs-blog`)
5. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
6. Click **"Deploy"**

**That's it for deployment.** Vercel now auto-deploys on every push to main.

### Step 2: Enable GitHub Actions Write Permissions

Required so Lighthouse workflow can commit score back to repo.

1. Go to your GitHub repo
2. **Settings → Actions → General**
3. Scroll to **"Workflow permissions"**
4. Select: **"Read and write permissions"**
5. Save

### Step 3: Done!

No tokens to manage. No secrets to configure. Zero maintenance.

---

## How It Works

### Deployment Flow

```
Push to main
    ↓
Vercel detects push (native GitHub integration)
    ↓
Vercel builds and deploys
    ↓
Vercel sends "deployment_status" event to GitHub
    ↓
GitHub Actions receives event
    ↓
Lighthouse workflow runs
    ↓
Score saved to lighthouse.json
    ↓
Committed back to repo
```

### What Happens Automatically

**On every push to main:**
1. Vercel builds and deploys your site
2. Vercel sends deployment success event to GitHub
3. GitHub Actions workflow triggers (`deployment_status` event)
4. Workflow waits 30 seconds for deployment to be fully live
5. Runs Lighthouse against https://htsulfuric.com
6. Updates `public/lighthouse.json` with new score
7. Commits the score back to repo
8. Score appears on About page

### Manual Lighthouse Run

You can trigger Lighthouse manually without deploying:

**GitHub:**
- Actions tab → "Lighthouse Score" → Run workflow

**Local:**
```bash
npm run lighthouse
```

---

## Understanding the Workflow

**File:** `.github/workflows/deploy-lighthouse.yml`

**Key parts explained:**

```yaml
on:
  deployment_status:  # Triggered when Vercel finishes deploying
  workflow_dispatch:  # Manual trigger option
```

**Why `deployment_status`?**
- Vercel sends this event when deployment succeeds
- GitHub Actions waits for deployment before running Lighthouse
- No race conditions, no guessing when deployment is ready

```yaml
if: github.event_name == 'workflow_dispatch' ||
    github.event.deployment_status.state == 'success'
```

**This condition means:**
- Run if manually triggered, OR
- Run if deployment was successful (not failed/pending)

---

## Vercel Dashboard Features

After connecting, you get:

**Automatic Deployments:**
- Every push to main → Production deployment
- Every PR → Preview deployment (temporary URL)

**Dashboard:**
- https://vercel.com/dashboard
- See all deployments
- View build logs
- Check deployment status
- Custom domains
- Analytics (optional paid feature)

**Preview Deployments:**
- Every PR gets unique URL
- Test changes before merging
- Automatic cleanup after PR closes

---

## Why This Approach is Better

### vs. GitHub Actions Deploying to Vercel

| Aspect | Vercel Native | GitHub Actions Deploy |
|--------|---------------|----------------------|
| Setup | Click "Connect" | Manage tokens, secrets |
| Security | No tokens stored | Static `VERCEL_TOKEN` |
| Maintenance | Zero | Token rotation, updates |
| Speed | Optimized by Vercel | Slower (CLI overhead) |
| Preview URLs | Automatic | Manual setup |
| Build cache | Vercel-optimized | Generic cache |

### vs. Manual Deployment

| Aspect | Vercel Native | Manual |
|--------|---------------|--------|
| Deploy | Automatic | Remember to deploy |
| Lighthouse | Automatic | Remember to run |
| Consistency | Always runs | Sometimes forget |

---

## Troubleshooting

### Lighthouse workflow not running

**Check:**
1. Did Vercel deployment succeed? (Check Vercel dashboard)
2. Workflow permissions enabled? (Settings → Actions → General)
3. Check Actions tab for errors

**Force run:**
- Actions tab → "Lighthouse Score" → Run workflow

### Score is 0 or not updating

**Possible causes:**
1. Lighthouse ran before site was fully ready
   - Workflow waits 30s, might not be enough
   - Increase `sleep 30` to `sleep 60` in workflow
2. Site not accessible at https://htsulfuric.com
   - Check if URL is correct
   - Check if domain DNS is configured
3. Lighthouse failed
   - Check Actions logs for errors

### Deployment failed

**Check Vercel dashboard:**
- https://vercel.com/dashboard
- Click on failed deployment
- View build logs
- Common issues:
  - Build errors (TypeScript, ESLint)
  - Missing dependencies
  - Environment variables

---

## Custom Domain Setup (Optional)

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `htsulfuric.com`)
3. Configure DNS (Vercel provides instructions)
4. Vercel auto-provisions SSL certificate

**Update workflow after adding domain:**
Edit `.github/workflows/deploy-lighthouse.yml`:
```yaml
env:
  SITE_URL: https://your-custom-domain.com
```

---

## OIDC Reality Check

**Why we don't use OIDC:**
- Vercel doesn't support OIDC authentication from GitHub Actions (yet)
- Feature requested but not implemented
- Vercel native integration is actually MORE secure (no tokens at all)

**Where OIDC works:**
- AWS deployments from GitHub Actions ✅
- Azure deployments from GitHub Actions ✅
- GCP deployments from GitHub Actions ✅
- Vercel backend → AWS/Azure/GCP ✅
- GitHub Actions → Vercel ❌ (not supported)

**Takeaway:** Vercel's native GitHub integration is the secure, token-less approach.
