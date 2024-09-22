import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Track Info',
    headline: 'Track Info',
    id: 'trackinfo',
    extraID: 'map',
    preScript: 'https://unpkg.com/leaflet/dist/leaflet.js',
    script: 'javascript/trackinfo.js'
  });
});

export default router;
