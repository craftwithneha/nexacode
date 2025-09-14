# PowerShell deployment script for Windows
Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run build test
Write-Host "🔨 Testing build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

# Check for git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git not found. Please install git." -ForegroundColor Red
    exit 1
}

# Check git status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Uncommitted changes found. Committing..." -ForegroundColor Yellow
    git add .
    git commit -m "Fix deployment errors and optimize for production"
}

# Push to main branch
Write-Host "🚀 Pushing to main branch..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to main branch!" -ForegroundColor Green
    Write-Host "🌐 Your app should be deploying on Vercel now." -ForegroundColor Cyan
    Write-Host "📊 Check your Vercel dashboard for deployment status." -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to push to main branch. Please check your git configuration." -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deployment process completed!" -ForegroundColor Green
