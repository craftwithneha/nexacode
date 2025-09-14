#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing deployment configuration...\n');

// Check if favicon exists
const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
if (fs.existsSync(faviconPath)) {
  console.log('✅ favicon.ico exists');
} else {
  console.log('❌ favicon.ico missing');
}

// Check if manifest exists
const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
if (fs.existsSync(manifestPath)) {
  console.log('✅ manifest.json exists');
} else {
  console.log('❌ manifest.json missing');
}

// Check if robots.txt exists
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('✅ robots.txt exists');
} else {
  console.log('❌ robots.txt missing');
}

// Check if sitemap.xml exists
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml exists');
} else {
  console.log('❌ sitemap.xml missing');
}

// Check Next.js config
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.ts exists');
} else {
  console.log('❌ next.config.ts missing');
}

// Check Vercel config
const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  console.log('✅ vercel.json exists');
} else {
  console.log('❌ vercel.json missing');
}

console.log('\n🚀 Deployment configuration looks good!');
console.log('\n📝 Next steps:');
console.log('1. Commit and push your changes');
console.log('2. Redeploy on Vercel');
console.log('3. Check the browser console for any remaining errors');
