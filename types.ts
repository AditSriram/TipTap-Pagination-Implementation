
export interface PageInfo {
  index: number;
  top: number;
  height: number;
}

export interface PaginationData {
  pageCount: number;
  totalHeight: number;
  pages: PageInfo[];
}
