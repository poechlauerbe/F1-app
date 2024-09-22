import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('laptimes', {
    title: 'Lap Times',
    headline: 'Lap Times',
    script: 'javascript/laptimes.js'
  });
});

export default router;
