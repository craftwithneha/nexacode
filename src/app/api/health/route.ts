import { NextResponse } from "next/server";
import { env, validateEnv } from "@/lib/env";

export async function GET() {
  try {
    const isEnvValid = validateEnv();
    
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      isProduction: env.IS_PRODUCTION,
      envValid: isEnvValid,
      services: {
        appwrite: {
          configured: !!(env.APPWRITE_ENDPOINT && env.APPWRITE_PROJECT_ID),
          endpoint: env.APPWRITE_ENDPOINT ? 'configured' : 'missing',
        },
        clerk: {
          configured: !!(env.CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY),
          publishableKey: env.CLERK_PUBLISHABLE_KEY ? 'configured' : 'missing',
        },
        ai: {
          groq: !!env.GROQ_API_KEY,
          openai: !!env.OPENAI_API_KEY,
        },
      },
    };

    return NextResponse.json(health, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 500 }
    );
  }
}
