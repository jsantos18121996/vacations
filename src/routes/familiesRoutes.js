const Router = require('express');
const router = Router();

const FamiliesService = require('../service/familiesService');

router.get('/all', async(req, res) => {

    const familiesService = new FamiliesService();
    try {
        const families = await familiesService.getAllFamilies();
        res.status(200).json({
            ok: true,
            families: families
        });
    } catch (error) {
        res.status(200).json({
            ok: false,
            families: []
        })
    }
});

router.post('/add', async(req, res) => {

    const familiesService = new FamiliesService();
    console.log('req.body in families/add ', req.body);
    try {
        const familyRS = await familiesService.addFamily(req.body);
        console.log('familyRS', familyRS);
        if (familyRS.errorMessage === null) {
            res.status(familyRS.status).json({
                ok: true,
                family: {
                    name: familyRS.family.name
                },
                message: "Familia añadida exitosamente!"
            });
        } else {
            res.status(familyRS.status).json({
                ok: false,
                family: null,
                message: familyRS.errorMessage
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "No pudo crearse la familia"
        })
    }
});

module.exports = router;