const Router = require('express');
const router = Router();

const BingosService = require('../service/bingosService');

router.get('/all', async(req, res) => {

    const bingosService = new BingosService();
    try {
        const bingos = await bingosService.getAllBingos();
        res.status(200).json({
            ok: true,
            bingos: bingos
        });
    } catch (error) {
        res.status(200).json({
            ok: false,
            bingos: []
        })
    }
});

router.post('/add', async(req, res) => {

    const bingosService = new BingosService();
    console.log('req.body in bingos/add ', req.body);
    try {
        const bingoRS = await bingosService.addBingo(req.body);
        console.log('bingoRS', bingoRS);
        if (bingoRS.errorMessage === null) {
            res.status(bingoRS.status).json({
                ok: true,
                bingo: {
                    number: bingoRS.bingo.number
                },
                message: "Bingo añadido exitosamente!"
            });
        } else {
            res.status(bingoRS.status).json({
                ok: false,
                bingo: null,
                message: bingoRS.errorMessage
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "No pudo crearse el grupo",
            bingo: null
        });
    }
});

module.exports = router;