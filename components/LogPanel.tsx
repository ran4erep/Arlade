import React, { useRef, useEffect } from 'react';

interface LogPanelProps {
  messages: string[];
}

const LogPanel: React.FC<LogPanelProps> = ({ messages }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col p-4 text-xs bg-gray-800">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-600 text-gray-300 flex-shrink-0">
        Журнал
      </h2>
      <div className="flex-grow overflow-y-auto pr-2">
        {messages.map((msg, index) => {
          if (msg.startsWith('$$SEP$$')) {
            return (
              <p key={index} className="text-center text-gray-500 my-2">
                {msg.substring(7)}
              </p>
            );
          }
          return (
            <p key={index} className={`mb-1 ${index === messages.length - 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-400'}`}>
              &gt; {msg}
            </p>
          );
        })}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default LogPanel;