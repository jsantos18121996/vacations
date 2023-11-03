const Family = require('../models/Family');

class CoursesService {

    async getAllFamilies() {
        try {
            let families = await Family.find();
            console.log('families obtenidos .. ', families);
            return families;
        } catch (error) {
            console.error('error in getAllFamilies', error);
            return [];
        }

    }

    async addFamily(request) {

        try {
            const { name } = request;
            let family = await Family.findOne({ name });
            console.log('familia encontrada -> ', family);
            if (family) {
                return {
                    errorMessage: "Ya existe una familia con ese nombre",
                    status: 400,
                    family: null
                }
            } else {
                family = new Family(request);
                console.log('family antes de insertar ! ', family);
                await family.save();
                return {
                    errorMessage: null,
                    status: 201,
                    family: family
                };
            }

        } catch (error) {
            console.error('No se pudo registrar la familia en la BD ', error);
            return {
                errorMessage: 'No se pudo registrar la familia en la BD ',
                status: 500,
                family: null
            }
        }

    }

}

module.exports = CoursesService;