const ICONS = {
  spotify: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.6-1.05 8.55-.6 11.66 1.34.35.21.47.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.79c4.35-1.33 9.76-.68 13.5 1.6.44.27.58.85.31 1.28Zm.13-3.4C15.16 8.45 8.9 8.26 5.18 9.38a1.13 1.13 0 1 1-.65-2.16c4.27-1.28 11.28-1.05 15.61 1.52a1.13 1.13 0 1 1-1.16 1.94Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M1.5 14.5h1v4h-1zm2-2h1v6h-1zm2 1h1v5h-1zm2-3h1v8h-1zm2 2h1v6h-1zm2-4h1v10h-1zm2 1h1v9h-1zm1.5-2.2c.2 0 .4 0 .6.1v7.6a3.3 3.3 0 0 1-5.7 2.5H6.4v-6.4a2.4 2.4 0 0 1 1.1-3.7 6 6 0 0 1 11.2-2.3 3.6 3.6 0 0 1 2.9 3.5A3.7 3.7 0 0 1 18 19.8v-.8a2.9 2.9 0 0 0 0-5.7v-2.2a2.5 2.5 0 0 0-4.8-1.4Z" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.55c-.03-2.53 2.06-3.75 2.15-3.8-1.17-1.71-2.99-1.95-3.64-1.98-1.55-.16-3.02.91-3.8.91-.78 0-1.99-.89-3.28-.87-1.69.02-3.24.98-4.11 2.5-1.75 3.04-.45 7.53 1.26 10 0 0 .84 1.54 2.06 1.52.83-.03 1.14-.53 2.14-.53s1.29.53 2.15.51c.89-.01 1.45-.74 2.06-1.52.65-1.02.92-2 0-2 0 0-1.02-1.72-.98-3.6ZM14.66 5.07c.54-.68.9-1.6.79-2.57-.77.03-1.7.51-2.25 1.16-.5.6-.93 1.56-.8 2.48.84.07 1.7-.42 2.26-1.07Z" />
    </svg>
  ),
  deezer: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <rect x="3" y="4" width="4" height="4" />
      <rect x="3" y="10" width="4" height="4" />
      <rect x="3" y="16" width="4" height="4" />
      <rect x="9" y="16" width="4" height="4" />
      <rect x="15" y="16" width="4" height="4" />
      <rect x="15" y="10" width="4" height="4" />
      <rect x="15" y="4" width="4" height="4" />
      <rect x="9" y="4" width="4" height="4" />
    </svg>
  ),
};

export default function SocialIcon({ name }) {
  return ICONS[name] || null;
}
