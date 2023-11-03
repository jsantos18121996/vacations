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
        res.status(200).json({
            ok: false,
            message: "No se pudo crear el grupo - excepción general",
            group: null
        });
    }
});

router.get('/:id', async(req, res) => {
    const groupsService = new GroupsService();
    try {
        const groupRS = await groupsService.findGroupById(req.params.id);
        console.log('groupRS ->     ', groupRS);
        if(groupRS.errorMessage === null) {
            res.json({
                ok: true,
                group: groupRS.group,
                status: groupRS.status,
                message: "Grupo encontrado exitosamente!"
            });
        } else {
            res.json({
                ok: false,
                group: groupRS.group,
                status: groupRS.status,
                message: groupRS.errorMessage
            })
        }
       
    } catch (error) {
        res.status(200).json({
            ok: false,
            group: null,
            message: "No se encontró al grupo - excepción general"
        });
    }
})

module.exports = router;