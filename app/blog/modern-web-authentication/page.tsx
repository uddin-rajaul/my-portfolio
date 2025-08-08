import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication in Modern Web Applications - Rajaul Uddin",
  description:
    "Explore modern authentication patterns including JWT, OAuth, and security best practices for web applications.",
}

export default function ModernWebAuthentication() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:opacity-80 mb-8 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Hero Image */}
          <div className="w-full h-64 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Authentication in Modern Web Applications</h1>
              <p className="text-red-100">Security patterns and best practices</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>August 8, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Authentication is the foundation of application security. After implementing various authentication
                systems, I've learned that the right approach depends on your specific requirements. Here's a practical
                guide to modern authentication patterns.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                JWT: The Stateless Approach
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                JSON Web Tokens provide a stateless authentication mechanism. Here's a secure implementation:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer

security = HTTPBearer()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Always use short-lived access tokens with longer-lived refresh tokens for better security.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Password Security Best Practices
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hashing with Salt</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {`import bcrypt

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(
        password.encode('utf-8'), 
        hashed.encode('utf-8')
    )`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rate Limiting</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Implement rate limiting on authentication endpoints to prevent brute force attacks. Use tools like
                    Redis for distributed rate limiting.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">OAuth 2.0 Integration</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                OAuth provides secure third-party authentication. Here's a Google OAuth example:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`from authlib.integrations.fastapi_oauth2 import OAuth2Token
from authlib.integrations.httpx_oauth2 import OAuth2Client

oauth2_client = OAuth2Client(
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    token_url="https://oauth2.googleapis.com/token",
)

@app.get("/auth/google")
async def google_auth():
    redirect_uri = "http://localhost:8000/auth/callback"
    return await oauth2_client.authorize_redirect(redirect_uri)

@app.get("/auth/callback")
async def google_callback(code: str):
    token = await oauth2_client.fetch_token(code)
    user_info = await get_google_user_info(token['access_token'])
    # Create or update user in database
    return {"user": user_info}`}
              </pre>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Security Checklist</h2>

              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                <li>Always use HTTPS in production</li>
                <li>Implement proper CORS policies</li>
                <li>Use secure, httpOnly cookies for sensitive data</li>
                <li>Implement account lockout after failed attempts</li>
                <li>Add two-factor authentication for sensitive operations</li>
                <li>Log authentication events for monitoring</li>
                <li>Regularly rotate secrets and keys</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Final Thoughts</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Authentication is not just about verifying identity - it's about building trust with your users. The
                patterns I've shared here have worked well in production applications, but always consider your specific
                security requirements and compliance needs. Security is an ongoing process, not a one-time
                implementation.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
