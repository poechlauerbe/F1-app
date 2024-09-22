import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('racecontrol', {
    title: 'Race Control',
    headline: 'Race Control',
    id: 'race-control',
    script: 'javascript/racecontrol.js'
  });
});

export default router;
