import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Team Radio',
    headline: 'Team Radio',
    id: 'teamradio',
    script: 'javascript/teamradio.js'
  });
});

export default router;
