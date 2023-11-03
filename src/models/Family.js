const { Schema, model } = require('mongoose');

const FamilySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

FamilySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("familia", FamilySchema);