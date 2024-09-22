import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('singledriver', {
    title: 'Single Driver',
    headline: 'Single Driver',
    id: 'singledriver'
  });
});

export default router;
