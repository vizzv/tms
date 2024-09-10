const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

organizationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
