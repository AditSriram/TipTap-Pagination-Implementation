
import React from 'react';
import { PAGE_HEIGHT_PX, PAGE_WIDTH_PX, MARGIN_PX } from '../constants';
import { PaginationData } from '../types';

interface PaginationOverlayProps {
  paginationData: PaginationData;
}

/**
 * PaginationOverlay
 * 
 * This component handles the visual representation of pages.
 * It renders a series of 8.5" x 11" white rectangles with shadows.
 */
const PaginationOverlay: React.FC<PaginationOverlayProps> = ({ paginationData }) => {
  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
      style={{ width: PAGE_WIDTH_PX }}
    >
      {paginationData.pages.map((page, i) => (
        <div 
          key={page.index}
          className="relative bg-white shadow-xl mb-8"
          style={{ 
            height: PAGE_HEIGHT_PX,
            width: PAGE_WIDTH_PX
          }}
        >
          {/* Top Margin Guide (Optional Visual) */}
          <div 
            className="absolute border-b border-blue-50 w-full opacity-0 hover:opacity-100 transition-opacity"
            style={{ top: MARGIN_PX }}
          />
          
          {/* Page Number Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-medium">
            Page {page.index}
          </div>

          {/* Page Break Visual (only if not the last page) */}
          {i < paginationData.pages.length - 1 && (
            <div 
              className="absolute -bottom-8 left-0 right-0 h-8 bg-slate-100 flex items-center justify-center border-y border-slate-200"
            >
              <div className="h-px bg-slate-300 w-full mx-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaginationOverlay;
