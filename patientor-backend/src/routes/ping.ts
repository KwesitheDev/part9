import express from 'express';

const router = express.Router();

router.get('/ping', (_req, res) => {
    res.send('Someone pinged here');
    console.log('pong');
});

export default router;

