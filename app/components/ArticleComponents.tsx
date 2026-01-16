
import React from 'react';

// Component for inline code snippets
export const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono bg-gray-800 text-sky-400 px-1 py-0.5 rounded-md text-sm">
    {children}
  </code>
);

// Component for code blocks
export const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4 text-sm">
    <code>{children}</code>
  </pre>
);

// Generic block component for different types of messages
const Block = ({ children, bgColor, borderColor, textColor }: { children: React.ReactNode, bgColor: string, borderColor: string, textColor: string }) => (
  <div className={`my-4 p-4 border-l-4 ${borderColor} ${bgColor} ${textColor} rounded-r-lg`}>
    {children}
  </div>
);

// Component for informational messages
export const InfoBlock = ({ children }: { children: React.ReactNode }) => (
  <Block bgColor="bg-sky-900/30" borderColor="border-sky-500" textColor="text-sky-300">
    {children}
  </Block>
);

// Component for summarizing points
export const SummaryBlock = ({ children }: { children: React.ReactNode }) => (
  <Block bgColor="bg-gray-800/50" borderColor="border-gray-500" textColor="text-gray-300">
    {children}
  </Block>
);

// Component for success messages or positive outcomes
export const SuccessBlock = ({ children }: { children: React.ReactNode }) => (
  <Block bgColor="bg-green-900/30" borderColor="border-green-500" textColor="text-green-300">
    {children}
  </Block>
);

// Component for warnings or potential issues
export const WarningBlock = ({ children }: { children: React.ReactNode }) => (
  <Block bgColor="bg-yellow-900/30" borderColor="border-yellow-500" textColor="text-yellow-300">
    {children}
  </Block>
);
