/**
 * FotO History Build
 * ------------------
 * Builds the /history/ section from the Decap CMS "History archive" entries
 * in history/archive/*.md and the section text in history/history.md.
 * Called from build.js, which passes in the shared nav and page furniture.
 */

const fs     = require('fs');
const path   = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT        = __dirname;
const HISTORY_DIR = path.join(ROOT, 'history');
const ARCHIVE_DIR = path.join(HISTORY_DIR, 'archive');

// Pages in the section. Categories not listed under a page go on Documents.
const PAGES = {
  newsletters:     { title: 'Newsletters',             categories: ['newsletter'],
                     blurb: 'Every past FotO newsletter we have a copy of, newest first.' },
  'annual-reports': { title: 'Annual reports',         categories: ['annual-report'],
                     blurb: 'Annual reviews and financial reports presented to members.' },
  documents:       { title: 'Documents & campaigns',   categories: null,
                     blurb: 'Campaign papers, surveys, press cuttings, photos and tributes, grouped by topic.' },
};

const CATEGORY_LABELS = {
  newsletter: 'Newsletter', 'annual-report': 'Annual report', campaign: 'Campaign paper',
  report: 'Report or survey', cutting: 'Press cutting', letter: 'Letter', photo: 'Photo',
  tribute: 'Tribute', other: 'Document',
};

// Order within a year: months first, seasons slotted in roughly where they fall
const PERIOD_ORDER = ['January', 'February', 'March', 'Spring', 'April', 'May', 'June', 'Summer',
  'July', 'August', 'September', 'Autumn', 'October', 'November', 'December', 'Winter'];

// Existing site pages about past campaigns, linked from the History landing page
const PAST_CAMPAIGNS = [
  ['/our-work/other-planning-issues/glenquey-quarry/', 'Glenquey Quarry', 'The five-year fight that saved Glenquey Moss from a sand and gravel quarry.'],
  ['/our-work/powerline/', 'Beauly to Denny power line', 'Our long campaign over the 400kV line through the western Ochils.'],
  ['/our-work/windfarms/', 'Windfarms', 'Decades of responses to windfarm proposals in and around the hills.'],
  ['/about-us/the-origin-of-foto/', 'The origin of FotO', 'How Rennie McOwan founded Friends of the Ochils in 1992.'],
];

const esc = t => String(t == null ? '' : t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function fileSize(publicPath) {
  if (!publicPath) return '';
  try {
    const bytes = fs.statSync(path.join(ROOT, decodeURI(publicPath))).size;
    return bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch (e) {
    console.warn(`  ! History: file not found ${publicPath}`);
    return '';
  }
}

function loadItems() {
  if (!fs.existsSync(ARCHIVE_DIR)) return [];
  return fs.readdirSync(ARCHIVE_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const { data } = matter(fs.readFileSync(path.join(ARCHIVE_DIR, f), 'utf8'));
      return {
        slug:        f.replace(/\.md$/, ''),
        title:       data.title || f,
        category:    data.category || 'other',
        year:        parseInt(data.year, 10) || 0,
        period:      data.period || '',
        issue:       data.issue || '',
        file:        data.file || '',
        image:       data.image || '',
        topic:       data.topic || '',
        description: data.description || '',
        source:      data.source || '',
      };
    })
    // Newest first; within a year, latest month or season first
    .sort((a, b) => (b.year - a.year)
      || (PERIOD_ORDER.indexOf(b.period) - PERIOD_ORDER.indexOf(a.period))
      || a.title.localeCompare(b.title));
}

function itemHtml(it, { showCategory }) {
  const link = it.file || it.image;
  const ext  = it.file ? (path.extname(it.file).slice(1).toUpperCase() || 'File') : 'Image';
  const size = fileSize(link);
  const meta = [
    [it.period, it.year || ''].filter(Boolean).join(' '),
    it.issue ? `Issue ${esc(it.issue)}` : '',
    showCategory ? CATEGORY_LABELS[it.category] || '' : '',
    link ? [ext, size].filter(Boolean).join(', ') : '',
  ].filter(Boolean).join(' · ');
  const titleHtml = link
    ? `<a href="${esc(link)}" target="_blank" rel="noopener">${esc(it.title)}</a>`
    : esc(it.title);
  const thumb = it.image
    ? `<a class="archive-thumb" href="${esc(link)}" target="_blank" rel="noopener"><img src="${esc(it.image)}" alt="" loading="lazy"/></a>`
    : '';
  return `<li class="archive-item">${thumb}
  <div class="archive-body">
    <h3>${titleHtml}</h3>
    ${meta ? `<p class="archive-meta">${meta}</p>` : ''}
    ${it.description ? `<p>${esc(it.description)}</p>` : ''}
    ${it.source ? `<p class="archive-source">${esc(it.source)}</p>` : ''}
  </div>
</li>`;
}

function groupedList(items, keyFn, opts) {
  const groups = new Map();
  items.forEach(it => {
    const k = keyFn(it);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(it);
  });
  return [...groups].map(([k, list]) =>
    `<h2>${esc(k)}</h2>\n<ul class="archive-list">\n${list.map(it => itemHtml(it, opts)).join('\n')}\n</ul>`
  ).join('\n');
}

module.exports = function buildHistory({ NAV, HAMBURGER_SCRIPT, BASE_URL }) {
  const items = loadItems();
  const text  = fs.existsSync(path.join(HISTORY_DIR, 'history.md'))
    ? matter(fs.readFileSync(path.join(HISTORY_DIR, 'history.md'), 'utf8')).data
    : {};

  // Mark History as the active menu item instead of Latest news
  const nav = NAV
    .replace('<a class="active" href="/latest-news/">', '<a href="/latest-news/">')
    .replace('<a href="/history/">', '<a class="active" href="/history/">');

  const pageOf = it => Object.keys(PAGES).find(p => PAGES[p].categories && PAGES[p].categories.includes(it.category)) || 'documents';

  const page = ({ slug, title, description, crumbs, body }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${esc(title)} – FotO</title>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<link rel="stylesheet" href="/styles.css"/>
<meta property="og:title" content="${esc(title)} – Friends of the Ochils"/>
<meta name="description" content="${esc(description)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${BASE_URL}/history/${slug ? slug + '/' : ''}"/>
<meta property="og:site_name" content="Friends of the Ochils"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="${BASE_URL}/wp-content/uploads/2011/11/foto_brand-jpeg1-300x134.jpg"/>
<meta name="twitter:card" content="summary"/>
</head>
<body>
${nav}
<div class="page-wrapper">
<nav aria-label="Breadcrumb" class="breadcrumb"><a href="/">Home</a> → ${crumbs}</nav>
<h1>${esc(title)}</h1>
<div class="page-content">
${body}
</div>
</div>
<footer>
<p>Friends of the Ochils &nbsp;|&nbsp; Scottish Charity: SC022034 &nbsp;|&nbsp;
  <a href="/contact-us/">Contact us</a> &nbsp;|&nbsp;
  <a href="/privacy-policy/">Privacy policy</a></p>
</footer>
${HAMBURGER_SCRIPT}
</body>
</html>`;

  const write = (slug, html) => {
    const dir = slug ? path.join(HISTORY_DIR, slug) : HISTORY_DIR;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    console.log(`  ✓ Built /history/${slug ? slug + '/' : ''}`);
  };

  const helpBox = `<div class="history-appeal">
<h2>Can you help?</h2>
${marked(text.appeal || '')}
<p><a href="/history/help/">How to share or scan old papers</a></p>
</div>`;

  // Landing page
  const counts = slug => items.filter(it => pageOf(it) === slug).length;
  const cards = Object.entries(PAGES).map(([slug, p]) => `  <a class="section-card" href="/history/${slug}/">
    <h2>${esc(p.title)}</h2>
    <p>${esc(p.blurb)} (${counts(slug)} item${counts(slug) === 1 ? '' : 's'})</p>
  </a>`).join('\n');
  const campaignCards = PAST_CAMPAIGNS.map(([href, t, d]) => `  <a class="section-card" href="${href}">
    <h2>${esc(t)}</h2>
    <p>${esc(d)}</p>
  </a>`).join('\n');
  write('', page({
    slug: '', title: 'History',
    description: 'The history of Friends of the Ochils: past newsletters, annual reports and campaign papers since 1992.',
    crumbs: '<span>History</span>',
    body: `${marked(text.intro || '')}
<div class="section-cards">
${cards}
</div>
<h2>Past campaigns</h2>
<div class="section-cards">
${campaignCards}
</div>
${helpBox}`,
  }));

  // Newsletters and annual reports: grouped by year. Documents: grouped by topic.
  Object.entries(PAGES).forEach(([slug, p]) => {
    const list = items.filter(it => pageOf(it) === slug);
    const body = slug === 'documents'
      ? groupedList(
          [...list].sort((a, b) => (a.topic ? 0 : 1) - (b.topic ? 0 : 1) || (a.topic || '').localeCompare(b.topic || '')),
          it => it.topic || 'Other documents', { showCategory: true })
      : `<ul class="archive-list">\n${list.map(it => itemHtml(it, { showCategory: false })).join('\n')}\n</ul>`;
    write(slug, page({
      slug, title: p.title,
      description: `${p.blurb} From the Friends of the Ochils archive.`,
      crumbs: `<a href="/history/">History</a> → <span>${esc(p.title)}</span>`,
      body: `<p>${esc(p.blurb)}</p>\n${list.length ? body : '<p>Nothing here yet.</p>'}\n${helpBox}`,
    }));
  });

  // Help page
  write('help', page({
    slug: 'help', title: 'Help us fill the gaps',
    description: 'Help Friends of the Ochils complete its archive of newsletters, reports and photos.',
    crumbs: '<a href="/history/">History</a> → <span>Help us fill the gaps</span>',
    body: `${marked(text.appeal || '')}\n<h2>Scanning tips</h2>\n${marked(text.scanning_tips || '')}`,
  }));

  console.log(`  ✓ History: ${items.length} archive items`);
  return ['', ...Object.keys(PAGES), 'help'];
};
