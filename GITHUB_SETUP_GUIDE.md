# GitHub Repository Setup Guide - DoctorPortal Project

## Overview
This guide will help you push the DoctorPortal project to a new GitHub repository under a "Project Booking Organisation".

## Prerequisites
You'll need:
- GitHub account (free at https://github.com)
- Git installed (if having admin issues, use GitHub Desktop instead)
- Project folder: `c:\Users\prani\Desktop\opd1\DoctorPortalApp`

## Step-by-Step Process

### Option 1: Using GitHub Web Interface + Git Desktop (Easiest)

#### Step 1.1: Create GitHub Organization
1. Go to https://github.com/organizations/new
2. Fill in:
   - **Organization name**: `project-booking-org` (or your preferred name)
   - **Billing email**: Your email
   - **Organization type**: Community (free)
3. Click "Create organization"
4. Complete the setup wizard

#### Step 1.2: Create New Repository
1. Go to your organization page: `https://github.com/project-booking-org`
2. Click "New" or "Create repository"
3. Fill in:
   - **Repository name**: `doctor-portal-app`
   - **Description**: "Unified Doctor Portal Application - comprehensive React Native medical app"
   - **Visibility**: Public (or Private)
   - **Initialize with**: Leave unchecked (we'll add existing code)
4. Click "Create repository"
5. **Copy the repository URL** - you'll see: `https://github.com/project-booking-org/doctor-portal-app.git`

#### Step 1.3: Install Git or GitHub Desktop
**Option A: GitHub Desktop (No admin needed)**
- Download from: https://desktop.github.com
- Install it
- Sign in with GitHub account

**Option B: Git for Windows (needs admin)**
- Download from: https://git-scm.com/download/win
- Run installer as administrator
- Accept defaults

#### Step 1.4: Push Project to GitHub
After Git/GitHub Desktop is installed, run these commands:

```powershell
cd "c:\Users\prani\Desktop\opd1\DoctorPortalApp"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Doctor Portal Application"

# Add remote repository (replace URL with your repo URL)
git remote add origin https://github.com/project-booking-org/doctor-portal-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 2: Using GitHub CLI (gh)

If you have GitHub CLI available:

```powershell
# Create organization
gh org create project-booking-org

# Create repository in organization
gh repo create project-booking-org/doctor-portal-app --source="c:\Users\prani\Desktop\opd1\DoctorPortalApp" --remote=origin --push
```

## Troubleshooting

### Issue: "Git command not found"
**Solution:**
- Install Git: https://git-scm.com/download/win (run as admin)
- Or use GitHub Desktop: https://desktop.github.com
- After installation, restart PowerShell

### Issue: "Authentication failed"
**Solution:**
1. Generate personal access token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select scopes: `repo`, `workflow`
   - Copy the token
2. When prompted for password, paste the token instead

### Issue: "Organization already exists"
**Solution:**
- Use a different organization name, e.g., `project-booking-2024`

## What Gets Pushed

Your repository will include:
- ✅ All source code (src/, components/)
- ✅ Configuration files (package.json, .env, app.json, eas.json)
- ✅ Documentation (README.md, guides, etc.)
- ✅ Dependencies (node_modules/ - can be ignored with .gitignore)
- ✅ Backup files (_OLD_APP_BACKUPS/)

## Repository Structure

```
github.com/project-booking-org/doctor-portal-app/
├── src/
├── components/
├── App.js
├── package.json
├── app.json
├── eas.json
├── README.md
├── iOS_DEPLOYMENT_GUIDE.md
└── ... other files
```

## After Pushing

1. Share repository link: `https://github.com/project-booking-org/doctor-portal-app`
2. Add team members to organization (optional)
3. Set up CI/CD with GitHub Actions (optional)
4. Enable branch protection (optional)

## Next Steps

1. **Install Git or GitHub Desktop** (see above)
2. **Create GitHub Organization** (if you don't have one)
3. **Create Repository** on GitHub
4. **Run git commands** to push your project
5. **Verify** on GitHub web interface

**Questions?** Check GitHub docs: https://docs.github.com

---

**Quick Command Summary:**
```powershell
git init
git add .
git commit -m "Initial commit: Doctor Portal Application"
git remote add origin https://github.com/project-booking-org/doctor-portal-app.git
git branch -M main
git push -u origin main
```
