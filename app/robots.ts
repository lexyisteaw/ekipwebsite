import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/yonetim-68riders-burak2026/', '/68riderstr/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/yonetim-68riders-burak2026/', '/68riderstr/', '/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/yonetim-68riders-burak2026/', '/68riderstr/', '/api/'],
      },
    ],
    sitemap: 'https://68riders.com/sitemap.xml',
    host: 'https://68riders.com',
  }
}
