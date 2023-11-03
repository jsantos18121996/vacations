const Group = require('../models/Group');

class GroupsService {

    async getAllGroups() {
        try {
            let groups = await Group.find();
            console.log('groups obtenidos .. ', groups);
            return groups;
        } catch (error) {
            console.error('error in getAllGroups', error);
            return [];
        }

    }

    async addGroup(request) {

        try {
            const { name } = request;
            let group = await Group.findOne({ name });
            console.log('grupo encontrado -> ', group);
            if (group) {
                return {
                    errorMessage: "Ya existe un grupo con ese nombre",
                    status: 400,
                    group: null
                }
            } else {
                group = new Group(request);
                console.log('group antes de insertar ! ', group);
                await group.save();
                return {
                    errorMessage: null,
                    status: 201,
                    group: group
                };
            }

        } catch (error) {
            console.error('No se pudo registrar el grupo en la BD ', error);
            return {
                errorMessage: 'No se pudo registrar el grupo en la BD ',
                status: 500,
                group: null
            }
        }

    }

}

module.exports = GroupsService;