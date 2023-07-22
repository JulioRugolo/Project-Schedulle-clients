const express = require('express');
const authController = require('../controllers/auth.controllers');
const { verifyToken } = require('../middlewares/auth.middlewares');
const {buscarDatasLivres} = require('../controllers/AgendamentoController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/me', verifyToken, authController.me);
router.get('/datas', buscarDatasLivres);

module.exports = router;
