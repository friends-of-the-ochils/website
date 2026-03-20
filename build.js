/**
 * FotO Website Build Script
 * -------------------------
 * Converts Decap CMS markdown articles in latest-news/ to HTML pages,
 * rebuilds the news index, and updates sitemap.xml.
 * Run via: node build.js
 * Cloudflare Pages build command: npm install && node build.js
 */

const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const NEWS_DIR    = path.join(__dirname, 'latest-news');
const SITEMAP     = path.join(__dirname, 'sitemap.xml');
const BASE_URL    = 'https://www.friendsoftheochils.org.uk';

// ── Standard site nav (active link set per page) ─────────────────────────────
const NAV = `<header class="site-header">
<a class="logo" href="/"><img alt="Friends of the Ochils" src="/wp-content/uploads/2011/11/foto_brand-jpeg1-300x134.jpg"/></a>
<div class="social-links">
<a aria-label="Facebook" href="https://www.facebook.com/Friendsoftheochils" rel="noopener" target="_blank">
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
  <rect width="28" height="28" rx="5" fill="#1877F2"/>
  <path d="M19 14h-3v-2c0-.8.4-1 1-1h2V8h-3c-2.8 0-4 1.8-4 4v2h-2v3h2v8h4v-8h2.6L19 14z" fill="#fff"/>
</svg></a></div></header>
<nav aria-label="Main navigation" class="main-nav">
<button aria-expanded="false" aria-label="Toggle menu" class="hamburger">☰</button>
<ul id="main-menu-list">
<li><a href="/">Home</a></li>
<li class="has-children"><a href="/our-work/">Our work</a><ul>
  <li><a href="/our-work/forestry/">Forestry</a></li>
  <li class="has-children"><a href="/our-work/other-planning-issues/">Other planning issues</a><ul>
    <li class="has-children"><a href="/our-work/other-planning-issues/glenquey-quarry/">Glenquey Quarry</a><ul>
      <li><a href="/our-work/other-planning-issues/glenquey-quarry/previous-documents/">Previous documents</a></li>
    </ul></li>
  </ul></li>
  <li><a href="/our-work/windfarms/">Windfarms</a></li>
  <li><a href="/our-work/powerline/">Beauly to Denny Power Line</a></li>
  <li class="has-children"><a href="/our-work/newsletters/">Newsletters</a><ul>
    <li><a href="/our-work/newsletters/annual-reviews-and-financial-reports/">Annual Reviews &amp; Financial Reports</a></li>
  </ul></li>
</ul></li>
<li><a class="active" href="/latest-news/">Latest news</a></li>
<li class="has-children"><a href="/about-us/">About us</a><ul>
  <li><a href="/about-us/the-origin-of-foto/">The Origin of FOTO</a></li>
  <li><a href="/about-us/our-mission/">Our Mission</a></li>
  <li><a href="/about-us/meet-the-committee/">Meet the Committee</a></li>
</ul></li>
<li class="has-children"><a href="/the-ochils/">About the hills</a><ul>
  <li><a href="/the-ochils/the-hills/">The Hills</a></li>
  <li><a href="/the-ochils/list-of-hills-and-maps/">List of hills &amp; maps</a></li>
  <li><a href="/the-ochils/books/">Books about the Ochils</a></li>
  <li><a href="/the-ochils/useful-links/">Useful links</a></li>
</ul></li>
<li><a href="/gallery/">Gallery</a></li>
<li><a href="/join-us/">Join us</a></li>
<li><a href="/contact-us/">Contact us</a></li>
</ul></nav>`;

const HAMBURGER_SCRIPT = `<script src="/nav.js"></script>`;

// ── HTML page template ────────────────────────────────────────────────────────
function articlePage({ title, dateStr, summary, bodyHtml, slug, ogImage }) {
  const ogImg = ogImage
    ? `${BASE_URL}${ogImage}`
    : `${BASE_URL}/wp-content/uploads/2011/11/foto_brand-jpeg1-300x134.jpg`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title} – FotO</title>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<link rel="stylesheet" href="/styles.css"/>
<meta property="og:title" content="${title} – FotO"/>
<meta property="og:description" content="${summary || ''}"/>
<meta property="og:url" content="${BASE_URL}/latest-news/${slug}/"/>
<meta property="og:site_name" content="Friends of the Ochils"/>
<meta property="og:type" content="article"/>
<meta property="og:image" content="${ogImg}"/>
<meta name="twitter:card" content="summary_large_image"/>
</head>
<body>
${NAV}
<div class="page-wrapper">
<nav aria-label="Breadcrumb" class="breadcrumb">
  <a href="/">Home</a> → <a href="/latest-news/">Latest news</a> → <span>${title}</span>
</nav>
<h1>${title}</h1>
${dateStr ? `<p class="news-meta">${dateStr}</p>` : ''}
<div class="page-content">
${bodyHtml}
</div>
</div>
<footer>
<p>Friends of the Ochils &nbsp;|&nbsp; Scottish Charity: SC022034 &nbsp;|&nbsp;
  <a href="/contact-us/">Contact us</a></p>
</footer>
${HAMBURGER_SCRIPT}
</body>
</html>`;
}

// ── Format a date string nicely ───────────────────────────────────────────────
function formatDate(dateVal) {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d)) return String(dateVal);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Process all markdown files ────────────────────────────────────────────────
const articles = []; // will hold metadata for all articles (md + existing html)

const entries = fs.readdirSync(NEWS_DIR);

entries.forEach(entry => {
  const fullPath = path.join(NEWS_DIR, entry);

  // Handle markdown files created by Decap CMS
  if (entry.endsWith('.md')) {
    const raw  = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const slug    = entry.replace(/\.md$/, '');
    const bodyHtml = marked(content);
    const dateStr  = formatDate(data.date);

    // Create the output folder
    const outDir = path.join(NEWS_DIR, slug);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

    // Write the HTML page
    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      articlePage({
        title:    data.title   || slug,
        dateStr,
        summary:  data.summary || '',
        bodyHtml,
        slug,
        ogImage:  data.og_image || '',
      }),
      'utf8'
    );

    console.log(`  ✓ Built article: /latest-news/${slug}/`);

    articles.push({
      slug,
      title:   data.title   || slug,
      date:    data.date    ? new Date(data.date) : new Date(0),
      dateStr,
      summary: data.summary || '',
    });

  // Handle existing HTML subdirectories (pre-migration articles)
  } else if (fs.statSync(fullPath).isDirectory()) {
    // Skip directories that have a companion .md file — already handled above
    if (entries.includes(entry + '.md')) return;

    const htmlPath = path.join(fullPath, 'index.html');
    if (!fs.existsSync(htmlPath)) return;

    // Try to read title and date from the existing HTML
    const html = fs.readFileSync(htmlPath, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch
      ? titleMatch[1].replace(/\s*[–-]\s*FotO\s*$/, '').trim()
      : entry;

    // Read optional published date from <meta property="article:published_time" content="YYYY-MM-DD"/>
    const dateMetaMatch = html.match(/<meta\s+property="article:published_time"\s+content="([^"]+)"/);
    const dateVal   = dateMetaMatch ? new Date(dateMetaMatch[1]) : new Date(0);
    const dateStr   = dateMetaMatch ? formatDate(dateMetaMatch[1]) : '';

    // Read optional summary
    const summaryMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/);
    const summary = summaryMatch ? summaryMatch[1] : '';

    articles.push({
      slug:  entry,
      title,
      date:  isNaN(dateVal) ? new Date(0) : dateVal,
      dateStr,
      summary,
    });
  }
});

// ── Sort articles newest first ────────────────────────────────────────────────
articles.sort((a, b) => b.date - a.date);

// ── Rebuild latest-news/index.html ───────────────────────────────────────────
const newsItems = articles.map(a => `
    <li class="news-item">
      <h2><a href="/latest-news/${a.slug}/">${a.title}</a></h2>
      ${a.dateStr ? `<p class="news-meta">${a.dateStr}</p>` : ''}
      ${a.summary ? `<p>${a.summary}</p>` : ''}
    </li>`).join('\n');

const newsIndex = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Latest news – FotO</title>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<link rel="stylesheet" href="/styles.css"/>
<meta property="og:title" content="Latest news – Friends of the Ochils"/>
<meta property="og:description" content="News and updates from Friends of the Ochils — covering our campaigns, planning decisions, and conservation work in and around the Ochils."/>
<meta property="og:url" content="${BASE_URL}/latest-news/"/>
<meta property="og:site_name" content="Friends of the Ochils"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="${BASE_URL}/wp-content/uploads/2011/11/foto_brand-jpeg1-300x134.jpg"/>
<meta name="twitter:card" content="summary"/>
</head>
<body>
${NAV}
<div class="page-wrapper">
<nav aria-label="Breadcrumb" class="breadcrumb"><a href="/">Home</a> → <span>Latest news</span></nav>
<h1>Latest news</h1>
<div class="page-content">
<p>The latest news and updates from Friends of the Ochils — covering our campaigns, planning decisions, and conservation work in and around the Ochils.</p>
<ul class="news-list">
${newsItems}
</ul>
</div>
</div>
<footer>
<p>Friends of the Ochils &nbsp;|&nbsp; Scottish Charity: SC022034 &nbsp;|&nbsp;
  <a href="/contact-us/">Contact us</a></p>
</footer>
${HAMBURGER_SCRIPT}
</body>
</html>`;

fs.writeFileSync(path.join(NEWS_DIR, 'index.html'), newsIndex, 'utf8');
console.log(`  ✓ Rebuilt latest-news/index.html (${articles.length} articles)`);

// ── Update homepage recent-posts section ──────────────────────────────────────
const HOMEPAGE = path.join(__dirname, 'index.html');
if (fs.existsSync(HOMEPAGE) && articles.length > 0) {
  let homeHtml = fs.readFileSync(HOMEPAGE, 'utf8');
  const recent = articles.slice(0, 3);
  const recentLis = recent.map(a =>
    `        <li><a href="/latest-news/${a.slug}/">${a.title}</a></li>`
  ).join('\n');
  const newBlock =
    `<div class="recent-posts">\n      <h2>Recent posts on our \'Latest news\' blog</h2>\n      <ul>\n${recentLis}\n      </ul>\n    </div>`;
  homeHtml = homeHtml.replace(
    /<div class="recent-posts">[\s\S]*?<\/div>/,
    newBlock
  );
  fs.writeFileSync(HOMEPAGE, homeHtml, 'utf8');
  console.log(`  ✓ Updated homepage recent posts (${recent.map(a => a.slug).join(', ')})`);
}

// ── Update sitemap.xml ────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);

// Read existing sitemap and remove any old news entries, then re-add
let sitemapContent = fs.existsSync(SITEMAP) ? fs.readFileSync(SITEMAP, 'utf8') : '';

// Remove existing latest-news article entries (will re-add fresh)
sitemapContent = sitemapContent.replace(
  /\s*<url>\s*<loc>[^<]*\/latest-news\/[^<]+<\/loc>[\s\S]*?<\/url>/g, ''
);

// Build news URL entries
const newsUrls = articles.map(a => `  <url>
    <loc>${BASE_URL}/latest-news/${a.slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

// Also add the news index itself
const newsIndexUrl = `  <url>
    <loc>${BASE_URL}/latest-news/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

sitemapContent = sitemapContent.replace(
  '</urlset>',
  `${newsIndexUrl}\n${newsUrls}\n</urlset>`
);

fs.writeFileSync(SITEMAP, sitemapContent, 'utf8');
console.log(`  ✓ Updated sitemap.xml`);

console.log('\nBuild complete.');
