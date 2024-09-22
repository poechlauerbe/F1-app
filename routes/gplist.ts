import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'GP List',
    headline: 'Grand Prix List',
    id: 'gplist',
    script: 'javascript/gplist.js'
  });
});

export default router;
