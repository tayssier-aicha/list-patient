const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get All Doctors (grouped by type)
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ type: 1, name: 1 });
        
        // Group doctors by type
        const doctorsByType = doctors.reduce((acc, doctor) => {
            if (!acc[doctor.type]) {
                acc[doctor.type] = [];
            }
            acc[doctor.type].push(doctor);
            return acc;
        }, {});
        
        res.json(doctorsByType);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get doctor with fewest patients for a specific type
router.get('/assign/:type', async (req, res) => {
    try {
        const doctorType = req.params.type;
        
        // Find doctor with fewest patients of this type
        const doctor = await Doctor.findOne({ type: doctorType })
            .sort({ patientCount: 1 })
            .limit(1);
        
        if (!doctor) {
            return res.status(404).json({ msg: 'No doctor found for this type' });
        }
        
        res.json(doctor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
