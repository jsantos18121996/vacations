const { Schema, model } = require('mongoose');

const GroupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    phoneContact: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
})

GroupSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("grupo", GroupSchema);