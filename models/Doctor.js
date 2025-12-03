const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'General Practitioner',
            'Cardiologist',
            'Neurologist',
            'Dermatologist',
            'Pediatrician',
            'Orthopedist',
            'Psychiatrist',
            'Other'
        ]
    },
    patientCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Doctor', DoctorSchema);
