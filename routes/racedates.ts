import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Race dates',
    headline: 'Race dates',
    id: 'racedates',
    script: 'javascript/racedates.js'
  });
});

export default router;
