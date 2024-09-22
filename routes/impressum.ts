import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Impressum',
    headline: 'Impressum',
    id: 'impressum',
    script: 'javascript/impressum.js'
  });
});

export default router;
