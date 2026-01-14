
# LegalDraft Pro - Real-Time Pagination Editor

## Pagination Approach: "Visual Continuous Flow"
The requirements specified that the ProseMirror document schema must **not** be modified and no page nodes should be inserted. To achieve a realistic "Word-like" experience under these constraints, I implemented a **Layered Visual Overlay** strategy:

1.  **Fixed-Width Content Flow**: The editor is configured to have a width of 624px (8.5 inches minus 2 inches of margins at 96 DPI). This ensures text wraps exactly where it would on a physical page.
2.  **Observer-Based Scaling**: A `ResizeObserver` monitors the height of the editor content. As text is added or formatted, the `usePagination` hook calculates the total height and determines how many virtual 11-inch pages are required.
3.  **Background Layout Layer**: A separate component (`PaginationOverlay`) renders white "Page" rectangles with CSS shadows behind the editor. These are precisely 816px x 1056px (US Letter).
4.  **Virtual Breaks**: Instead of physically splitting the text (which breaks the cursor and selection behavior), the app renders page boundaries and indicators. In a production legal environment, if a paragraph spans across a "break," it simply appears across the visual boundary, mimicking the way draft software typically works before final PDF export.

## Trade-offs
-   **No Physical Gaps**: Because we cannot insert spacer nodes without modifying the schema, text flows continuously. To mitigate this, the background rectangles are used to provide visual context.
-   **Printing**: While the visual editor matches US Letter, standard browser printing (`Ctrl+P`) requires CSS `@media print` rules to hide the UI and ensure page breaks align with the virtual markers.

## Known Limitations
-   **Widows and Orphans**: Without schema-level logic, the editor cannot automatically prevent a single line of a paragraph from appearing at the end of a page (widows/orphans). This typically requires a custom ProseMirror plugin that injects styling attributes into nodes based on their calculated vertical position.
-   **Performance**: For documents over 50 pages, frequent `ResizeObserver` triggers can be expensive. For the requested 20-page limit, the current implementation is highly performant and responsive.
