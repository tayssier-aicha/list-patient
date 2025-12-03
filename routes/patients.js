const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Get All Patients (with populated doctor info)
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find()
            .populate('assignedDoctor', 'name type')
            .sort({ createdAt: -1 });
        res.json(patients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add Patient
router.post('/', async (req, res) => {
    try {
        const { name, age, diagnosis, status, contact, doctorType, examined, treatmentDetails, medicines } = req.body;

        // Find doctor with fewest patients of the selected type
        let assignedDoctor = null;
        if (doctorType && doctorType !== 'Not Assigned') {
            const doctor = await Doctor.findOne({ type: doctorType })
                .sort({ patientCount: 1 })
                .limit(1);
            
            if (doctor) {
                assignedDoctor = doctor._id;
                // Increment doctor's patient count
                await Doctor.findByIdAndUpdate(doctor._id, {
                    $inc: { patientCount: 1 }
                });
            }
        }

        const newPatient = new Patient({
            name,
            age,
            diagnosis,
            status,
            contact,
            doctorType,
            assignedDoctor,
            examined,
            treatmentDetails,
            medicines
        });

        const patient = await newPatient.save();
        
        // Populate doctor info before returning
        await patient.populate('assignedDoctor', 'name type');
        
        res.json(patient);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Patient
router.put('/:id', async (req, res) => {
    try {
        const { name, age, diagnosis, status, contact, doctorType, examined, treatmentDetails, medicines } = req.body;

        // Get current patient data
        const currentPatient = await Patient.findById(req.params.id);
        if (!currentPatient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        // Handle doctor reassignment if doctorType changed
        let assignedDoctor = currentPatient.assignedDoctor;
        
        if (doctorType !== currentPatient.doctorType) {
            // Decrement old doctor's patient count
            if (currentPatient.assignedDoctor) {
                await Doctor.findByIdAndUpdate(currentPatient.assignedDoctor, {
                    $inc: { patientCount: -1 }
                });
            }

            // Assign to new doctor with fewest patients
            if (doctorType && doctorType !== 'Not Assigned') {
                const doctor = await Doctor.findOne({ type: doctorType })
                    .sort({ patientCount: 1 })
                    .limit(1);
                
                if (doctor) {
                    assignedDoctor = doctor._id;
                    await Doctor.findByIdAndUpdate(doctor._id, {
                        $inc: { patientCount: 1 }
                    });
                }
            } else {
                assignedDoctor = null;
            }
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            {
                name,
                age,
                diagnosis,
                status,
                contact,
                doctorType,
                assignedDoctor,
                examined,
                treatmentDetails,
                medicines
            },
            { new: true }
        ).populate('assignedDoctor', 'name type');

        res.json(updatedPatient);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete Patient
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        // Decrement doctor's patient count
        if (patient.assignedDoctor) {
            await Doctor.findByIdAndUpdate(patient.assignedDoctor, {
                $inc: { patientCount: -1 }
            });
        }

        await Patient.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Patient deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
