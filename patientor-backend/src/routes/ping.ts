import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Someone pinged here');
    console.log('pong');
});

export default router;

