
/**
 * Conversion constants: 1 inch = 96 pixels (Standard web DPI)
 */
export const DPI = 96;
export const INCH_TO_PX = 96;

export const PAGE_WIDTH_IN = 8.5;
export const PAGE_HEIGHT_IN = 11;
export const MARGIN_IN = 1;

export const PAGE_WIDTH_PX = PAGE_WIDTH_IN * INCH_TO_PX;    // 816px
export const PAGE_HEIGHT_PX = PAGE_HEIGHT_IN * INCH_TO_PX;  // 1056px
export const MARGIN_PX = MARGIN_IN * INCH_TO_PX;            // 96px

/**
 * The content area where text actually flows (within margins)
 */
export const CONTENT_WIDTH_PX = PAGE_WIDTH_PX - (2 * MARGIN_PX); // 624px
export const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - (2 * MARGIN_PX); // 864px
