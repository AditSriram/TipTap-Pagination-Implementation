
import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Header from './Header';
import Toolbar from './Toolbar';
import PaginationOverlay from './PaginationOverlay';
import { usePagination } from '../hooks/usePagination';
import { PAGE_WIDTH_PX, MARGIN_PX } from '../constants';

const Editor: React.FC = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // starter kit configuration
      }),
    ],
    content: `
      <h1>Software License & Services Agreement</h1>
      <p>This SOFTWARE LICENSE AND SERVICES AGREEMENT (this “Agreement”) is made and entered into as of this date, by and between the Licensed Entity and the Provider.</p>
      
      <h2>RECITALS</h2>
      <p>WHEREAS, Provider has developed certain proprietary software solutions and provides related professional services;</p>
      <p>WHEREAS, Licensee desires to obtain a license to use such software and receive such services in accordance with the terms herein.</p>

      <h2>1. DEFINITIONS</h2>
      <p><strong>1.1 "Authorized User"</strong> means those employees, agents and independent contractors of Licensee who are authorized by Licensee to use the Software and the Documentation.</p>
      <p><strong>1.2 "Documentation"</strong> means the operating manuals, user instructions, and other documentation relating to the Software as may be supplied by Provider.</p>

      <h2>2. GRANT OF LICENSE</h2>
      <p>Subject to the terms and conditions of this Agreement, Licensor hereby grants to Licensee a non-exclusive, non-transferable license during the Term to use the Software solely for Licensee's internal business purposes.</p>
      
      <ul>
        <li>Users must adhere to internal security protocols at all times.</li>
        <li>Annual audits are required for compliance monitoring.</li>
        <li>Sub-licensing is strictly prohibited without prior written consent from the Provider's Legal Department.</li>
      </ul>

      <p>This draft is structured for US Letter output. You can edit this text directly, use formatting tools above, and see page breaks update in real-time. Use the "Print / PDF" button in the header to export a clean, margin-accurate document.</p>
      
      <h2>3. CONFIDENTIALITY</h2>
      <p>Each party acknowledges that it may have access to certain confidential information of the other party concerning the other party's business, plans, customers, technology, and products, including the terms and conditions of this Agreement ("Confidential Information").</p>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none tiptap p-0',
        style: `width: ${PAGE_WIDTH_PX - 2 * MARGIN_PX}px; min-height: 800px;`,
      },
    },
  });

  const paginationData = usePagination(editorContainerRef);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900">
      <Header />
      <Toolbar editor={editor} />
      
      <div className="flex-1 overflow-y-auto bg-slate-100 p-8 scroll-smooth">
        <div className="relative mx-auto pb-20" style={{ width: PAGE_WIDTH_PX }}>
          {/* Layer 1: Background Pages */}
          <PaginationOverlay paginationData={paginationData} />

          {/* Layer 2: Content Layer */}
          <div 
            className="relative z-10 pointer-events-none"
            style={{ 
              paddingTop: MARGIN_PX, 
              paddingLeft: MARGIN_PX,
              paddingRight: MARGIN_PX
            }}
          >
            <div ref={editorContainerRef} className="pointer-events-auto">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-2 flex justify-between items-center text-[10px] text-slate-500 px-6 no-print uppercase tracking-wider font-bold">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Editor Connected & Synced</span>
        </div>
        <div>
          {paginationData.pageCount} {paginationData.pageCount === 1 ? 'PAGE' : 'PAGES'} • {Math.round(paginationData.totalHeight)}PX HEIGHT
        </div>
      </div>
    </div>
  );
};

export default Editor;
