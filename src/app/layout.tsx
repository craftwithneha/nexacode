
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   subsets: ["latin"],
//   variable: "--font-geist-sans",
// });

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
     
//           {children}
        
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Google fonts
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// ✅ Add metadata instead of <head>
export const metadata = {
  title: "NexaCode",
  description: "Your AI coding assistant powered by Next.js & Appwrite",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global error handler for external scripts
              window.addEventListener('error', function(e) {
                if (e.filename && (e.filename.includes('contentScript') || e.filename.includes('extension'))) {
                  e.preventDefault();
                  console.warn('External script error prevented:', e.message);
                  return false;
                }
              });
              
              // Handle unhandled promise rejections
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && (e.reason.message.includes('find') || e.reason.message.includes('i18next'))) {
                  e.preventDefault();
                  console.warn('External script promise rejection prevented:', e.reason);
                  return false;
                }
              });
              
              // Suppress i18next warnings
              const originalWarn = console.warn;
              console.warn = function(...args) {
                if (args[0] && typeof args[0] === 'string' && args[0].includes('i18next')) {
                  return;
                }
                originalWarn.apply(console, args);
              };
              
              // Suppress lazy loading warnings
              const originalLog = console.log;
              console.log = function(...args) {
                if (args[0] && typeof args[0] === 'string' && args[0].includes('Images loaded lazily')) {
                  return;
                }
                originalLog.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
