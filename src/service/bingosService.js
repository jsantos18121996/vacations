const Bingo = require('../models/Bingo');
const Group = require('../models/Group');

class BingosService {

    async getAllBingos() {

        try {
            let bingos = await Bingo.find();
            console.log('bingos obtenidos .. ', bingos);
            return bingos;
        } catch (error) {
            console.error('error in getAllBingos', error);
            return [];
        }

    }

    async addBingo(request) {

        try {
            const { number } = request;
            let bingo = await Bingo.findOne({ number });
            console.log('bingo encontrado -> ', bingo);
            if (bingo) {
                return {
                    errorMessage: "Ya existe un bingo con ese número",
                    status: 400,
                    bingo: null
                }
            } else {
                const { groupId } = request;
                console.log('groupId a consultar ', groupId);
                let group = await Group.findById(groupId);
                console.log('group encontrado ', group);
                request["groupName"] = group.name;
                bingo = new Bingo(request);
                console.log('bingo antes de insertar ! ', bingo);
                await bingo.save();
                return {
                    errorMessage: null,
                    status: 201,
                    bingo: bingo
                };
            }

        } catch (error) {
            console.error('No se pudo registrar el bingo en la BD ', error.message);
            return {
                errorMessage: 'No se pudo registrar el bingo en la BD ',
                status: 500,
                bingo: null
            }
        }

    }

}

module.exports = BingosService;