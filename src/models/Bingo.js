const { Schema, model } = require('mongoose');

const BingoSchema = Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true//0-> A CUENTA, 1: -> PAGADO
    },
    statusDesc: {
        type: String,
        required: true
    },
    paymentType: {// 0: A CUENTA, 1: EFECTIVO, 2: YAPE/PLIN, 3: DÓLARES
        type: String,
        required: true
    },
    paymentTypeDesc: {
        type: String,
        required: true
    },
    paymentDate: {//"01/11/2023"
        type: String,
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,//"6544a17b1671c82ce94035b1"
        ref: "grupo"
    },
    groupName: {
        type: String,
        required: true
    }
})

BingoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("bingo", BingoSchema);