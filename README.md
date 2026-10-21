# website
website of friendsoftheochils.org.uk

## History archive

The History section (`/history/`) is built by `build-history.js` from the CMS collection **History archive** (`history/archive/*.md`). The page text (intro, "Can you help?" appeal, scanning tips) is under **History pages** in the CMS (`history/history.md`).

To add a scanned document: open `/admin`, go to History archive, click New, fill in the title, type and year, and upload the PDF. It appears on the right History page when the site rebuilds. New uploads go in `wp-content/uploads/archive/`.

Old newsletter page URLs redirect to the new pages via `_redirects`.
