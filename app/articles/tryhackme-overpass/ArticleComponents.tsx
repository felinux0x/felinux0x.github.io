import React from 'react';

export const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-900/50 p-4 rounded-md overflow-x-auto text-sm text-white/90 font-mono">
    <code>{children}</code>
  </pre>
);

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-700/50 text-orange-300 py-1 px-1.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

export const InfoBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md my-4">
        {children}
    </div>
);

export const SummaryBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-800/50 border-l-4 border-gray-500 p-4 rounded-md my-4">
        {children}
    </div>
);

export const WarningBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-md my-4">
        {children}
    </div>
);

export const SuccessBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-green-900/30 border-l-4 border-green-400 p-4 rounded-md my-4">
        {children}
    </div>
);