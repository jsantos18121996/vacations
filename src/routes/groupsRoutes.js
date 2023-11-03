const Router = require('express');
const router = Router();

const GroupsService = require('../service/groupsService');

router.get('/all', async(req, res) => {

    const groupsService = new GroupsService();
    try {
        const groups = await groupsService.getAllGroups();
        res.status(200).json({
            ok: true,
            groups: groups
        });
    } catch (error) {
        res.status(200).json({
            ok: false,
            groups: []
        })
    }
});

router.post('/add', async(req, res) => {

    const groupsService = new GroupsService();
    console.log('req.body in groups/add ', req.body);
    try {
        const groupRS = await groupsService.addGroup(req.body);
        console.log('groupRS', groupRS);
        if (groupRS.errorMessage === null) {
            res.status(groupRS.status).json({
                ok: true,
                group: {
                    name: groupRS.group.name
                },
                message: "Grupo añadido exitosamente!"
            });
        } else {
            res.status(groupRS.status).json({
                ok: false,
                group: null,
                message: groupRS.errorMessage
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "No pudo crearse el grupo"
        });
    }
});

module.exports = router;