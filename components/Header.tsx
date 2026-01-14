
import React, { useState } from 'react';
import { Share2, Printer, Check, Copy, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="h-12 bg-slate-900 text-white flex items-center justify-between px-4 z-50 no-print">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <FileText size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-tight">LegalDraft Pro</h1>
          <span className="text-[10px] text-slate-400 font-medium -mt-0.5">V1.2.0 • PRODUCTION READY</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center px-3 py-1 bg-slate-800 rounded-md border border-slate-700 mr-4">
          <input 
            type="text" 
            defaultValue="Software_Licensing_Agreement_2024.v1" 
            className="bg-transparent border-none focus:outline-none text-xs text-slate-200 w-64 font-mono"
          />
        </div>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-medium"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              <span>Share Editor</span>
            </>
          )}
        </button>

        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors text-xs font-medium"
        >
          <Printer size={14} />
          <span>Print / PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
