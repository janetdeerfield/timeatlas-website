import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  backgroundColor?: string;
  textColor?: string;
}

export function ToolCard({ title, description, icon: Icon, href, backgroundColor, textColor }: ToolCardProps) {
  return (
    <Link
      to={href}
      className="block p-6 rounded-xl transition-all group text-center"
      style={{
        backgroundColor: backgroundColor || '#FFFFFF',
        border: '1px solid #E6E9EE',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 132, 208, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex flex-col items-center">
        <div 
          className="px-6 py-3 rounded-full font-semibold mb-3"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#FFFFFF',
            backgroundColor: textColor || '#0A84D0',
            fontSize: '16px',
            minWidth: '170px',
          }}
        >
          {title}
        </div>
        <p 
          className="text-sm"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            color: '#364151',
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}