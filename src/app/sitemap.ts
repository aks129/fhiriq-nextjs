import { MetadataRoute } from 'next';

const BASE = 'https://fhiriq.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                          changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/podcast`,             changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/blog`,                changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/library`,             changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/tools`,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/resources`,           changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/consulting`,          changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/training`,            changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/architectures`,       changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/cqlguide`,            changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/mappingguide`,        changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/profilingguide`,      changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/investor`,            changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`,             changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/games`,               changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/privacy`,             changeFrequency: 'yearly',  priority: 0.2 },
  ];
}
