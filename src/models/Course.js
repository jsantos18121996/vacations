const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    abreviature: {
        type: String,
        required: true
    },
    customer: {//esto es temporal luego eliminarlo
        type: Schema.Types.ObjectId,
        ref: "customer"
    }
})

CourseSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("course", CourseSchema);