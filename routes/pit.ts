import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Pit Stops',
    headline: 'Pit Stops',
    id: 'pit',
    script: 'javascript/pit.js'
  });
});

export default router;
