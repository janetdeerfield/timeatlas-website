/**
 * Article loading utility for TimeAtlas Journal.
 * Articles are stored as Markdown files in src/articles/ with YAML frontmatter.
 * At build time, Vite's import.meta.glob collects all .md files and their metadata.
 * At runtime, marked + highlight.js render the Markdown to HTML.
 *
 * The FAQ frontmatter field is parsed and passed to the Article page component,
 * which injects it as FAQPage JSON-LD schema — no server required.
 */

import { marked } from 'marked';
import hljs from 'highlight.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;      // ISO 8601 date string, e.g. "2026-06-04"
  category: string;
  tags: string[];
  keyTakeaways: string[];
  faq: Array<{ question: string; answer: string }>;
  /** Optional path to a hero image, e.g. "/images/journal/hero-dst.web" */
  heroImage?: string;
}

export interface Article extends ArticleFrontmatter {
  /** Rendered HTML — safe to use with dangerouslySetInnerHTML */
  contentHtml: string;
  /** Headings extracted from the markdown for TOC generation */
  headings: ArticleHeading[];
  /** Word count of the article body */
  wordCount: number;
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export interface ArticleMeta extends ArticleFrontmatter {
  wordCount: number;
}

// ─── marked configuration (runs client-side, called once at module init) ───────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildHeadingId(text: string): string {
  // Strip markdown syntax from heading text before slugifying
  return slugify(text.replace(/[#*`]/g, ''));
}

marked.use({
  renderer: {
    // Override heading renderer to inject id attributes for deep-linking and TOC
    heading({ text, depth }) {
      const id = buildHeadingId(text);
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    // Override code renderer to apply highlight.js syntax highlighting
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>\n`;
    },
  },
  gfm: true,
  breaks: false,
});

// ─── Markdown processing helpers ─────────────────────────────────────────────

/**
 * Strip YAML frontmatter from a raw markdown string.
 * Returns { frontmatter: raw YAML string, body: markdown without frontmatter }.
 */
function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: raw };
  return { frontmatter: match[1], body: match[2] };
}

/**
 * Minimal YAML parser for the specific frontmatter fields we use.
 * Handles only: plain strings, quoted strings, arrays of strings.
 * No nested objects, no anchors, no multi-line blocks.
 */
function parseFrontmatter(yaml: string): Partial<ArticleFrontmatter> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let i = 0;

  function parseValue(line: string): string | string[] {
    const s = line.trim();
    // Inline array: [item1, item2, ...]
    if (s.startsWith('[')) {
      const inner = s.replace(/^\[|\]$/g, '');
      return inner.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
    }
    // Quoted string
    if (s.startsWith('"') || s.startsWith("'")) {
      return s.slice(1, -1);
    }
    // Plain value (up to the colon if any)
    const colonIdx = s.indexOf(':');
    return colonIdx === -1 ? s : s.slice(colonIdx + 1).trim();
  }

  while (i < lines.length) {
    const line = lines[i];
    // Array line (no colon, indented under previous key)
    if (!line.includes(':') && line.trim().startsWith('-')) {
      const arrKey = Object.keys(result).at(-1);
      if (Array.isArray(result[arrKey!])) {
        (result[arrKey!] as string[]).push(line.trim().replace(/^-\s*/, ''));
      }
    } else if (line.includes(':')) {
      const colonIdx = line.indexOf(':');
      const key = line.slice(0, colonIdx).trim();
      const val = parseValue(line.slice(colonIdx + 1));
      result[key] = val;
    }
    i++;
  }

  return result as Partial<ArticleFrontmatter>;
}

/** Count words in a markdown body (strips code blocks, headings markers, links) */
function countWords(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]+/g, '')
    .trim();
  if (!stripped) return 0;
  return stripped.split(/\s+/).filter(Boolean).length;
}

/** Extract headings from rendered HTML for TOC generation */
function extractHeadings(html: string): ArticleHeading[] {
  const headingRegex = /<h([234])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[234]>/g;
  const headings: ArticleHeading[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10) as 2 | 3 | 4,
      id: match[2],
      // Strip any inner HTML tags from heading text
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }
  return headings;
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Get all articles' metadata (no content), sorted newest-first.
 * Uses Vite's import.meta.glob to collect all .md files at build time.
 */
export function getAllArticles(): ArticleMeta[] {
  // Vite replaces this glob at build time with an object mapping paths to modules.
  // Each module has .default (raw string) and .attributes (frontmatter from VitePress frontmatter).
  const modules = import.meta.glob<string>('/src/articles/*.md', { query: '?raw', import: 'default', eager: true });

  const articles: ArticleMeta[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const { frontmatter } = splitFrontmatter(raw);
    const fm = parseFrontmatter(frontmatter);
    if (!fm.slug || !fm.title) continue;

    articles.push({
      title: fm.title,
      slug: fm.slug,
      description: fm.description ?? '',
      publishedAt: fm.publishedAt ?? '',
      category: fm.category ?? 'general',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      keyTakeaways: Array.isArray(fm.keyTakeaways) ? fm.keyTakeaways : [],
      faq: Array.isArray(fm.faq) ? fm.faq : [],
      wordCount: countWords(raw),
    });
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a single article by slug, fully rendered with HTML, headings, and word count.
 * Returns null if the slug does not match any article.
 */
export function getArticle(slug: string): Article | null {
  const modules = import.meta.glob<string>('/src/articles/*.md', { query: '?raw', import: 'default', eager: true });

  for (const [path, raw] of Object.entries(modules)) {
    const { frontmatter, body } = splitFrontmatter(raw);
    const fm = parseFrontmatter(frontmatter);
    if (fm.slug !== slug) continue;

    const contentHtml = marked.parse(body) as string;
    const headings = extractHeadings(contentHtml);
    const wordCount = countWords(body);

    return {
      title: fm.title ?? 'Untitled',
      slug: fm.slug,
      description: fm.description ?? '',
      publishedAt: fm.publishedAt ?? '',
      category: fm.category ?? 'general',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      keyTakeaways: Array.isArray(fm.keyTakeaways) ? fm.keyTakeaways : [],
      faq: Array.isArray(fm.faq) ? fm.faq : [],
      contentHtml,
      headings,
      wordCount,
    };
  }

  return null;
}

/**
 * Format a date string for display, e.g. "June 4, 2026".
 */
export function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}