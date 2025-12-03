const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    diagnosis: {
        type: String,
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Waiting', 'Diagnosed', 'Treated'],
        default: 'Waiting'
    },
    contact: {
        type: String,
        required: true
    },
    doctorType: {
        type: String,
        default: 'Not Assigned'
    },
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        default: null
    },
    examined: {
        type: Boolean,
        default: false
    },
    treatmentDetails: {
        type: String,
        default: ''
    },
    medicines: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', PatientSchema);
