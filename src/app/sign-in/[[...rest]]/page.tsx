// 'use client';

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { User, Lock } from 'lucide-react';
// import { account } from '@/lib/appwriteClient';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function SignInPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Delete existing session if any
//       try {
//         await account.deleteSession('current');
//       } catch (_) {
//         // No session exists, ignore
//       }

//       // Create new session
//       await account.createEmailPasswordSession({
//         email,
//         password,
//       });

//       router.push('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">
//       {/* Neon Background Orbs */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-10 left-1/4 w-72 h-72 bg-[rgb(96,252,182)] opacity-10 blur-[120px] animate-spin-slow rounded-full" />
//         <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-purple-400 opacity-10 blur-[100px] animate-pulse rounded-full" />
//         <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-400 opacity-5 blur-[150px] rounded-full animate-pulse" />
//       </div>

//       <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-[0_0_40px_rgba(96,252,182,0.2)]">
//         <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
//           Sign In
//         </h1>

//         {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="text-zinc-300 mb-2 block">Email</label>
//             <div className="relative">
//               <User className="absolute left-3 top-3 text-[rgb(96,252,182)]" size={18} />
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-400 focus:ring-2 focus:ring-[rgb(96,252,182)]"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-zinc-300 mb-2 block">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-[rgb(96,252,182)]" size={18} />
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-400 focus:ring-2 focus:ring-[rgb(96,252,182)]"
//                 required
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-xl bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 hover:from-emerald-300 hover:to-emerald-500 text-black font-medium shadow-lg"
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </Button>
//         </form>

//         <p className="mt-6 text-center text-zinc-400 text-sm">
//           Don't have an account?{' '}
//           <Link href="/sign-up" className="text-[rgb(96,252,182)] hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';
import { account } from '@/lib/appwriteClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Delete existing session if any
      try {
        await account.deleteSession('current');
      } catch {
        // ignore if no session exists
      }

      // Create new session
      await account.createEmailPasswordSession({
        email,
        password,
      });

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">
      {/* Neon Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[rgb(96,252,182)] opacity-10 blur-[120px] animate-spin-slow rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-purple-400 opacity-10 blur-[100px] animate-pulse rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-400 opacity-5 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-[0_0_40px_rgba(96,252,182,0.2)]">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
          Sign In
        </h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-zinc-300 mb-2 block">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-[rgb(96,252,182)]" size={18} />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-400 focus:ring-2 focus:ring-[rgb(96,252,182)]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-zinc-300 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[rgb(96,252,182)]" size={18} />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white placeholder-zinc-400 focus:ring-2 focus:ring-[rgb(96,252,182)]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 hover:from-emerald-300 hover:to-emerald-500 text-black font-medium shadow-lg"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[rgb(96,252,182)] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
