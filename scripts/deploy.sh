#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build test
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

# Check for git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install git."
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes found. Committing..."
    git add .
    git commit -m "Fix deployment errors and optimize for production"
fi

# Push to main branch
echo "🚀 Pushing to main branch..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to main branch!"
    echo "🌐 Your app should be deploying on Vercel now."
    echo "📊 Check your Vercel dashboard for deployment status."
else
    echo "❌ Failed to push to main branch. Please check your git configuration."
    exit 1
fi

echo "🎉 Deployment process completed!"
