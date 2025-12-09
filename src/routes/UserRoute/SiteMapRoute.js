import express from "express";
import db from "models";
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const router = express.Router();

router.get('/',  async (req, res) => {
  const posts = await db.Post.findAll();

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    ...posts.map(post => ({
      url: `/${post.slug}/detail`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: post.updated_at
    }))
  ];
  const hostname = process.env.URL_CLIENT || 'http://localhost:3000';

  const stream = new SitemapStream({ hostname });
  const xml = await streamToPromise(Readable.from(links).pipe(stream));

  res.header('Content-Type', 'application/xml');
  res.send(xml.toString());
});
export default router;