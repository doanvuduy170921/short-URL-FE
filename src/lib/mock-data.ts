// Realistic mock data for the QuickLink dashboard
export type LinkStatus = "active" | "expired";

export interface ShortLink {
  id: string;
  slug: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
  status: LinkStatus;
  hasPassword: boolean;
  expiresAt?: string;
}

export const mockLinks: ShortLink[] = [
  {
    id: "1",
    slug: "launch-2026",
    originalUrl: "https://producthunt.com/posts/quicklink-modern-url-shortener-with-analytics",
    createdAt: "2026-07-02",
    clicks: 12847,
    status: "active",
    hasPassword: false,
  },
  {
    id: "2",
    slug: "gh-repo",
    originalUrl: "https://github.com/quicklink/monorepo/pull/482",
    createdAt: "2026-07-05",
    clicks: 3421,
    status: "active",
    hasPassword: true,
  },
  {
    id: "3",
    slug: "summer-sale",
    originalUrl: "https://shop.example.com/collections/summer-2026?utm_source=twitter",
    createdAt: "2026-06-18",
    clicks: 8930,
    status: "active",
    hasPassword: false,
    expiresAt: "2026-08-31",
  },
  {
    id: "4",
    slug: "beta-invite",
    originalUrl: "https://app.quicklink.io/beta/invite?token=abc123xyz",
    createdAt: "2026-05-30",
    clicks: 542,
    status: "expired",
    hasPassword: true,
    expiresAt: "2026-06-30",
  },
  {
    id: "5",
    slug: "yt-demo",
    originalUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-07-10",
    clicks: 15234,
    status: "active",
    hasPassword: false,
  },
  {
    id: "6",
    slug: "portfolio",
    originalUrl: "https://linkedin.com/in/jane-designer-portfolio-2026",
    createdAt: "2026-07-12",
    clicks: 923,
    status: "active",
    hasPassword: false,
  },
  {
    id: "7",
    slug: "webinar-jul",
    originalUrl: "https://zoom.us/webinar/register/growth-marketing-july",
    createdAt: "2026-06-25",
    clicks: 4102,
    status: "active",
    hasPassword: false,
    expiresAt: "2026-07-31",
  },
];

export const clicksOverTime = [
  { date: "Jul 09", clicks: 1240, unique: 890 },
  { date: "Jul 10", clicks: 1890, unique: 1320 },
  { date: "Jul 11", clicks: 2340, unique: 1780 },
  { date: "Jul 12", clicks: 1980, unique: 1420 },
  { date: "Jul 13", clicks: 2780, unique: 2010 },
  { date: "Jul 14", clicks: 3420, unique: 2540 },
  { date: "Jul 15", clicks: 4120, unique: 3010 },
  { date: "Jul 16", clicks: 3890, unique: 2870 },
];

export const referrers = [
  { name: "Direct", value: 4820 },
  { name: "Twitter", value: 3210 },
  { name: "Facebook", value: 2140 },
  { name: "LinkedIn", value: 1580 },
  { name: "Reddit", value: 890 },
  { name: "Email", value: 620 },
];

export const devices = [
  { name: "Mobile", value: 62 },
  { name: "Desktop", value: 31 },
  { name: "Tablet", value: 7 },
];

export const countries = [
  { name: "United States", value: 3420 },
  { name: "Vietnam", value: 2180 },
  { name: "United Kingdom", value: 1590 },
  { name: "Germany", value: 1240 },
  { name: "Japan", value: 980 },
];

export const stats = {
  totalLinks: 247,
  totalClicks: 46_192,
  activeLinks: 231,
  qrCodes: 89,
};
