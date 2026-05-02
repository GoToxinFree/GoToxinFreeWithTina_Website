"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import YoutubeExtension from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, List, ListOrdered, Quote, 
  Image as ImageIcon, Video as VideoIcon, 
  Link as LinkIcon, Heading1, Heading2, Heading3,
  Undo, Redo, Type, ExternalLink, Trash2, Edit2
} from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      YoutubeExtension.configure({
        controls: true,
        nocookie: true,
        allowFullscreen: true,
        width: 640,
        height: 360,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your research...',
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div style={{ minHeight: '300px', border: '1px solid var(--admin-border)', borderRadius: '8px', backgroundColor: 'white' }} />;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('Enter YouTube Video URL (e.g., https://www.youtube.com/watch?v=...)');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const updateYoutubeUrl = () => {
    const currentUrl = editor.getAttributes('youtube').src;
    const newUrl = window.prompt('Update YouTube URL', currentUrl);
    if (newUrl) {
      editor.commands.setYoutubeVideo({ src: newUrl });
    }
  };

  return (
    <div className="editor-container" style={{ border: '1px solid var(--admin-border)', borderRadius: '12px', backgroundColor: 'white', overflow: 'hidden' }}>
      {editor && (
        <BubbleMenu 
          editor={editor} 
          shouldShow={({ editor }) => editor.isActive('link') || editor.isActive('youtube')}
        >
          <div style={{ 
            backgroundColor: 'var(--admin-primary)', 
            padding: '0.5rem', 
            borderRadius: '8px', 
            display: 'flex', 
            gap: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {editor.isActive('link') && (
              <>
                <ToolbarButton onClick={setLink} active icon={<Edit2 size={16} color="white" />} />
                <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} icon={<Trash2 size={16} color="white" />} />
              </>
            )}
            
            {editor.isActive('youtube') && (
              <>
                <ToolbarButton onClick={updateYoutubeUrl} active icon={<Edit2 size={16} color="white" />} />
                <ToolbarButton onClick={() => editor.chain().focus().deleteSelection().run()} icon={<Trash2 size={16} color="white" />} />
                <div style={{ color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', padding: '0 0.5rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
                  {editor.getAttributes('youtube').src?.substring(0, 30)}...
                </div>
              </>
            )}
          </div>
        </BubbleMenu>
      )}

      <div className="editor-toolbar" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.25rem', 
        padding: '0.75rem', 
        borderBottom: '1px solid var(--admin-border)',
        backgroundColor: '#f8fafc',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={<Heading1 size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={<Heading2 size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} icon={<Heading3 size={18} />} />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--admin-border)', margin: '0 0.5rem' }} />
        
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={<Bold size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={<Italic size={18} />} />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--admin-border)', margin: '0 0.5rem' }} />
        
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={<List size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={<ListOrdered size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={<Quote size={18} />} />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--admin-border)', margin: '0 0.5rem' }} />
        
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={<LinkIcon size={18} />} />
        <ToolbarButton onClick={addImage} icon={<ImageIcon size={18} />} />
        <ToolbarButton onClick={addYoutubeVideo} icon={<VideoIcon size={18} />} />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--admin-border)', margin: '0 0.5rem' }} />
        
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={18} />} />
      </div>

      <div style={{ padding: '1.5rem', minHeight: '400px' }}>
        <EditorContent editor={editor} className="prose-editor" />
      </div>

      <style jsx global>{`
        .prose-editor .tiptap {
          outline: none;
          min-height: 400px;
        }
        .prose-editor .tiptap p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .prose-editor .tiptap h1 { font-size: 2rem; color: var(--admin-primary); margin-bottom: 1rem; }
        .prose-editor .tiptap h2 { font-size: 1.5rem; color: var(--admin-primary); margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose-editor .tiptap h3 { font-size: 1.25rem; color: var(--admin-primary); margin-top: 1.25rem; margin-bottom: 0.5rem; }
        .prose-editor .tiptap blockquote { border-left: 4px solid var(--admin-secondary); padding-left: 1rem; color: var(--admin-text-muted); font-style: italic; margin: 1.5rem 0; }
        .prose-editor .tiptap img { max-width: 100%; border-radius: 8px; margin: 1.5rem 0; }
        .prose-editor .tiptap iframe { width: 100%; aspect-ratio: 16/9; border-radius: 8px; margin: 1.5rem 0; border: 2px solid transparent; transition: border-color 0.2s; }
        .prose-editor .tiptap iframe.ProseMirror-selectednode { border-color: var(--admin-secondary); outline: 4px solid rgba(0, 166, 206, 0.2); }
        .prose-editor .tiptap ul, .prose-editor .tiptap ol { padding-left: 1.5rem; margin: 1rem 0; }
      `}</style>
    </div>
  );
}

function ToolbarButton({ onClick, active, icon }: { onClick: () => void, active?: boolean, icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: active ? 'var(--admin-secondary)' : 'transparent',
        color: active ? 'white' : 'var(--admin-text-muted)',
        cursor: 'pointer',
        transition: 'all 0.1s',
      }}
      title="Editor Tool"
    >
      {icon}
    </button>
  );
}
