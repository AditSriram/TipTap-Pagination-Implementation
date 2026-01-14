
import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Undo, 
  Redo 
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-white border-b border-slate-200 sticky top-12 z-40 shadow-sm no-print">
      <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('bold') ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('italic') ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('bulletList') ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded transition-colors hover:bg-slate-100 ${editor.isActive('orderedList') ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <div className="flex-grow" />

      <div className="flex items-center gap-1 px-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-opacity"
          title="Undo (Ctrl+Z)"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-opacity"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
