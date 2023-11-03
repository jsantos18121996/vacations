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

    async findGroupById(id) {
        try {
            console.log('id ! ', id);
            let group = await Group.findById(id);
            console.log('grupo encontrado .. ', group);
            if(group) {
                return {
                    group : group,
                    status: 200,
                    errorMessage: null
                }
            } else {
                return {
                    group : null,
                    status: 200,
                    errorMessage: "No se encontró el grupo"
                }
            }
        } catch (error) {
            console.error('error in findGroupById', error);
            return {
                group: null,
                status: 500,
                errorMessage: "No pudo se pudo consultar a la BD"
            };
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