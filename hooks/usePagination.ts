
import { useState, useEffect, RefObject } from 'react';
import { PAGE_HEIGHT_PX, MARGIN_PX } from '../constants';
import { PaginationData, PageInfo } from '../types';

/**
 * usePagination
 * 
 * Monitors the provided element's height using ResizeObserver.
 * Calculates how many virtual pages are needed based on PAGE_HEIGHT_PX.
 * Since we are doing "Visual Only" pagination without splitting nodes,
 * we simply track the cumulative height of the editor content.
 */
export function usePagination(containerRef: RefObject<HTMLElement>): PaginationData {
  const [data, setData] = useState<PaginationData>({
    pageCount: 1,
    totalHeight: 0,
    pages: [{ index: 1, top: 0, height: PAGE_HEIGHT_PX }]
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updatePagination = () => {
      // We look at the content height inside the editor.
      // Tiptap's .tiptap element height determines document length.
      const contentHeight = element.scrollHeight;
      
      // Calculate how many pages are required to cover this height
      // We account for the padding/margins in our calculation
      // For visual simplicity, if height is 0-PAGE_HEIGHT_PX, it's 1 page.
      const pageCount = Math.max(1, Math.ceil(contentHeight / PAGE_HEIGHT_PX));
      
      const pages: PageInfo[] = [];
      for (let i = 0; i < pageCount; i++) {
        pages.push({
          index: i + 1,
          top: i * PAGE_HEIGHT_PX,
          height: PAGE_HEIGHT_PX
        });
      }

      setData({
        pageCount,
        totalHeight: contentHeight,
        pages
      });
    };

    // Initialize
    updatePagination();

    // Observe changes to the content height
    const observer = new ResizeObserver(() => {
      updatePagination();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [containerRef]);

  return data;
}
