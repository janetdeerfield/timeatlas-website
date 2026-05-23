import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../utils/format';

interface CopyButtonProps {
  text: string;
  label: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium"
      style={{
        backgroundColor: 'white',
        color: copied ? '#0066AA' : '#364151',
        border: '1px solid #D9DEE6',
      }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" style={{ color: '#0066AA' }} />
          <span style={{ color: '#0066AA' }}>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
