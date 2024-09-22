import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Race Leaderboard',
    headline: 'Race Leaderboard',
    id: 'positions',
    script: 'javascript/leaderboard.js'
  });
});

export default router;
