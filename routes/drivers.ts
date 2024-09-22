import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('page01', {
    title: 'Drivers',
    headline: 'Drivers',
    id: 'drivers',
    script: 'javascript/drivers.js'
  });
});

export default router;
