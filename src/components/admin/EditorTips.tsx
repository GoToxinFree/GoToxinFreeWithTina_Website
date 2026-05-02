"use client";

import { useState } from 'react';
import { 
  Video, Image as ImageIcon, Link as LinkIcon, 
  Keyboard, Save, Info, ChevronDown, ChevronUp 
} from 'lucide-react';

interface TipProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Tip({ title, icon, children, defaultOpen = false }: TipProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: '1px solid rgba(0, 78, 100, 0.05)' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--admin-primary)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {icon}
          {title}
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div style={{ 
          paddingBottom: '1rem', 
          fontSize: '0.85rem', 
          color: 'var(--admin-text-muted)', 
          lineHeight: 1.6 
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function EditorTips() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      padding: '1.5rem',
      border: '1px solid var(--admin-border)',
      boxShadow: 'var(--admin-shadow)'
    }}>
      <h3 style={{ 
        margin: '0 0 1rem 0', 
        fontSize: '1.1rem', 
        fontWeight: 800, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        color: 'var(--admin-primary)' 
      }}>
        <Info size={20} /> Research Editor Guide
      </h3>
      
      <Tip title="YouTube Videos" icon={<Video size={18} />} defaultOpen={true}>
        Click the Video icon in the toolbar or paste a link. 
        <strong> Click on the video</strong> in the editor to see the link, edit the URL, or delete the video.
      </Tip>

      <Tip title="Adding Images" icon={<ImageIcon size={18} />}>
        Use the Image icon to add visuals from a URL. Images are automatically optimized to be responsive and look premium in your research articles.
      </Tip>

      <Tip title="Managing Links" icon={<LinkIcon size={18} />}>
        Highlight any text and click the Link icon to add a URL. You can click on an existing link to update it or remove it instantly.
      </Tip>

      <Tip title="Shortcuts" icon={<Keyboard size={18} />}>
        <ul style={{ paddingLeft: '1.25rem', margin: '0.5rem 0' }}>
          <li><strong>Cmd/Ctrl + B</strong>: Bold</li>
          <li><strong>Cmd/Ctrl + I</strong>: Italic</li>
          <li><strong>Cmd/Ctrl + Z</strong>: Undo</li>
        </ul>
      </Tip>

      <Tip title="Publishing" icon={<Save size={18} />}>
        Articles are saved as drafts by default. Toggle the <strong>"Visibility"</strong> switch in the sidebar to make your research live on the blog.
      </Tip>
    </div>
  );
}
