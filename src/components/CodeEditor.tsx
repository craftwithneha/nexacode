// "use client";

// import { useState } from "react";
// import Editor from "@monaco-editor/react";

// export default function CodeEditor() {
//   const [code, setCode] = useState("// Start coding with AI 🚀");

//   return (
//     <div className="border border-gray-700 rounded-lg overflow-hidden h-[55vh] sm:h-[60vh] md:h-[65vh] min-h-64">
//       <Editor
//         height="100%"
//         defaultLanguage="javascript"
//         defaultValue={code}
//         theme="vs-dark"
//         onChange={(value) => setCode(value || "")}
//       />
//     </div>
//   );
// }



'use client';

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding with AI 🚀");

  return (
    <div className="relative border border-emerald-500/40 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(96,252,182,0.15)] hover:shadow-[0_0_60px_rgba(96,252,182,0.25)] transition-all h-[55vh] sm:h-[60vh] md:h-[65vh] min-h-64">
      
      {/* Neon glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent blur-xl opacity-40 animate-pulse"></div>
      
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          minimap: { enabled: false },
          lineNumbers: "on",
          automaticLayout: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
