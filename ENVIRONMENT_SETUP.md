# 🔧 Environment Variables Setup Guide

## Required Environment Variables for Vercel

Set these in your Vercel dashboard → Project Settings → Environment Variables:

### 1. Appwrite Configuration
```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
```

### 2. Clerk Authentication (if using)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. AI API Keys (optional)
```bash
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Vercel Configuration
```bash
NEXT_PUBLIC_VERCEL_URL=your-app.vercel.app
```

## 🔍 Troubleshooting "Failed to Fetch" Error

### 1. Check Appwrite Configuration
- Verify your Appwrite endpoint is correct
- Ensure your project ID is correct
- Check if your Appwrite project is active

### 2. CORS Configuration
In your Appwrite console:
1. Go to Settings → Domains
2. Add your Vercel domain: `https://your-app.vercel.app`
3. Add localhost for development: `http://localhost:3000`

### 3. Check Network Tab
1. Open browser DevTools → Network tab
2. Try to sign in/up
3. Look for failed requests to Appwrite
4. Check the error details

### 4. Test Appwrite Connection
Visit: `https://your-app.vercel.app/api/health`
This will show you the status of all services.

## 🚨 Common Issues & Solutions

### Issue: "Failed to fetch" during authentication
**Solution:**
1. Check CORS settings in Appwrite
2. Verify environment variables are set correctly
3. Ensure Appwrite project is active

### Issue: Console warnings about i18next
**Solution:**
- These are from browser extensions, already handled in the code

### Issue: Image lazy loading warnings
**Solution:**
- These are browser optimization warnings, already suppressed

### Issue: Environment variables not loading
**Solution:**
1. Restart your Vercel deployment
2. Check variable names (case-sensitive)
3. Ensure variables are set for Production environment

## 📋 Verification Checklist

- [ ] Appwrite endpoint is correct
- [ ] Project ID is correct
- [ ] CORS is configured for your domain
- [ ] Environment variables are set in Vercel
- [ ] Appwrite project is active
- [ ] Health check endpoint works
- [ ] No console errors (except suppressed ones)

## 🔗 Useful Links

- [Appwrite Console](https://cloud.appwrite.io)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Appwrite CORS Documentation](https://appwrite.io/docs/advanced/platform/cors)
