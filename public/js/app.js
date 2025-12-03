const patientGrid = document.getElementById('patient-grid');
const addPatientBtn = document.getElementById('add-patient-btn');
const viewDoctorsBtn = document.getElementById('view-doctors-btn');
const logoutBtn = document.getElementById('logout-btn');
const languageSelect = document.getElementById('language-select');
const addModal = document.getElementById('add-modal');
const editModal = document.getElementById('edit-modal');
const doctorsModal = document.getElementById('doctors-modal');
const addPatientForm = document.getElementById('add-patient-form');
const editPatientForm = document.getElementById('edit-patient-form');
const doctorsContainer = document.getElementById('doctors-container');

// Check Auth
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// Initialize language
const savedLanguage = localStorage.getItem('language') || 'en';
languageSelect.value = savedLanguage;
changeLanguage(savedLanguage);

// Language switcher
languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Modal Logic - Close buttons
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalType = e.target.dataset.modal;
        if (modalType === 'add') {
            addModal.classList.remove('active');
        } else if (modalType === 'edit') {
            editModal.classList.remove('active');
        } else if (modalType === 'doctors') {
            doctorsModal.classList.remove('active');
        }
    });
});

// Open Add Modal
addPatientBtn.addEventListener('click', () => {
    addModal.classList.add('active');
});

// Open Doctors Modal
viewDoctorsBtn.addEventListener('click', async () => {
    await fetchAndDisplayDoctors();
    doctorsModal.classList.add('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addModal) {
        addModal.classList.remove('active');
    }
    if (e.target === editModal) {
        editModal.classList.remove('active');
    }
    if (e.target === doctorsModal) {
        doctorsModal.classList.remove('active');
    }
});

// Toggle treatment fields based on examined checkbox - Add Form
const examinedCheckbox = document.getElementById('examined');
const treatmentGroup = document.getElementById('treatment-group');
const medicinesGroup = document.getElementById('medicines-group');

examinedCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        treatmentGroup.style.display = 'block';
        medicinesGroup.style.display = 'block';
    } else {
        treatmentGroup.style.display = 'none';
        medicinesGroup.style.display = 'none';
        document.getElementById('treatmentDetails').value = '';
        document.getElementById('medicines').value = '';
    }
});

// Toggle treatment fields based on examined checkbox - Edit Form
const editExaminedCheckbox = document.getElementById('edit-examined');
const editTreatmentGroup = document.getElementById('edit-treatment-group');
const editMedicinesGroup = document.getElementById('edit-medicines-group');

editExaminedCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        editTreatmentGroup.style.display = 'block';
        editMedicinesGroup.style.display = 'block';
    } else {
        editTreatmentGroup.style.display = 'none';
        editMedicinesGroup.style.display = 'none';
        document.getElementById('edit-treatmentDetails').value = '';
        document.getElementById('edit-medicines').value = '';
    }
});

// Fetch and Display Doctors
async function fetchAndDisplayDoctors() {
    try {
        const res = await fetch('/api/doctors');
        const doctorsByType = await res.json();
        
        doctorsContainer.innerHTML = '';
        
        // Order of specializations
        const specialtyOrder = [
            'General Practitioner',
            'Cardiologist',
            'Neurologist',
            'Dermatologist',
            'Pediatrician',
            'Orthopedist',
            'Psychiatrist',
            'Other'
        ];
        
        const specialtyTranslations = {
            'General Practitioner': 'generalPractitioner',
            'Cardiologist': 'cardiologist',
            'Neurologist': 'neurologist',
            'Dermatologist': 'dermatologist',
            'Pediatrician': 'pediatrician',
            'Orthopedist': 'orthopedist',
            'Psychiatrist': 'psychiatrist',
            'Other': 'other'
        };
        
        specialtyOrder.forEach(specialty => {
            if (doctorsByType[specialty] && doctorsByType[specialty].length > 0) {
                const section = document.createElement('div');
                section.className = 'doctor-specialty-section';
                
                const header = document.createElement('h3');
                header.className = 'specialty-header';
                header.textContent = t(specialtyTranslations[specialty]);
                section.appendChild(header);
                
                const grid = document.createElement('div');
                grid.className = 'doctors-grid';
                
                doctorsByType[specialty].forEach(doctor => {
                    const card = document.createElement('div');
                    card.className = 'doctor-card';
                    
                    card.innerHTML = `
                        <div class="doctor-name">${doctor.name}</div>
                        <div class="doctor-patient-count">
                            <span>${t('patients')}:</span>
                            <span class="patient-count-badge">${doctor.patientCount}</span>
                        </div>
                    `;
                    
                    grid.appendChild(card);
                });
                
                section.appendChild(grid);
                doctorsContainer.appendChild(section);
            }
        });
    } catch (err) {
        console.error('Error fetching doctors:', err);
        doctorsContainer.innerHTML = `<p style="color: var(--text-muted);">${t('errorLoadingDoctors')}</p>`;
    }
}

// Fetch Patients
async function fetchPatients() {
    try {
        const res = await fetch('/api/patients');
        const patients = await res.json();
        renderPatients(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
    }
}

function renderPatients(patients) {
    patientGrid.innerHTML = '';
    
    if (patients.length === 0) {
        patientGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">${t('noPatients')}</p>`;
        return;
    }

    patients.forEach(patient => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        
        const statusClass = `status-${patient.status.toLowerCase()}`;
        
        // Translate status
        const statusTranslationKeys = {
            'Waiting': 'waiting',
            'Diagnosed': 'diagnosed',
            'Treated': 'treated'
        };
        const statusText = t(statusTranslationKeys[patient.status]) || patient.status;
        
        // Get assigned doctor name
        const doctorName = patient.assignedDoctor ? patient.assignedDoctor.name : t('notAssigned');
        
        // Build medicines HTML
        let medicinesHTML = '';
        if (patient.examined && patient.medicines && patient.medicines.length > 0) {
            medicinesHTML = `
                <div class="patient-info">
                    <strong>${t('medicines')}:</strong>
                    <div class="medicines-list">
                        ${patient.medicines.map(med => `<span class="medicine-tag">${med}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        // Build examination details HTML
        let examinationHTML = '';
        if (patient.examined) {
            examinationHTML = `
                <div class="patient-details">
                    <div class="patient-info"><strong>${t('treatmentDetails')}:</strong> ${patient.treatmentDetails || t('noDetailsProvided')}</div>
                    ${medicinesHTML}
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="patient-header">
                <span class="patient-name">${patient.name}</span>
                <span class="patient-status ${statusClass}">${statusText}</span>
            </div>
            <div class="patient-info"><strong>${t('age')}:</strong> ${patient.age}</div>
            <div class="patient-info"><strong>${t('diagnosis')}:</strong> ${patient.diagnosis}</div>
            <div class="patient-info"><strong>${t('contact')}:</strong> ${patient.contact}</div>
            <div class="patient-info"><strong>${t('doctorType')}:</strong> ${patient.doctorType || t('notAssigned')}</div>
            <div class="patient-info" style="direction: rtl; text-align: right;"><strong>${t('assignedDoctor')}:</strong> ${doctorName}</div>
            <div class="patient-info"><strong>${t('examined')}:</strong> ${patient.examined ? t('yes') : t('no')}</div>
            ${examinationHTML}
            <div class="patient-actions">
                <button class="btn btn-small btn-edit" onclick="openEditModal('${patient._id}')">${t('editBtn')}</button>
                <button class="btn btn-small btn-delete" onclick="deletePatient('${patient._id}')">${t('deleteBtn')}</button>
            </div>
        `;
        
        patientGrid.appendChild(card);
    });
}

// Add Patient
addPatientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const medicinesInput = document.getElementById('medicines').value;
    const medicinesArray = medicinesInput ? medicinesInput.split(',').map(m => m.trim()).filter(m => m) : [];
    
    const newPatient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        diagnosis: document.getElementById('diagnosis').value || 'Pending',
        status: document.getElementById('status').value,
        contact: document.getElementById('contact').value,
        doctorType: document.getElementById('doctorType').value,
        examined: document.getElementById('examined').checked,
        treatmentDetails: document.getElementById('treatmentDetails').value,
        medicines: medicinesArray
    };

    try {
        const res = await fetch('/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatient)
        });

        if (res.ok) {
            addModal.classList.remove('active');
            addPatientForm.reset();
            treatmentGroup.style.display = 'none';
            medicinesGroup.style.display = 'none';
            fetchPatients(); // Refresh list
        } else {
            alert(t('errorAddingPatient'));
        }
    } catch (err) {
        console.error('Error adding patient:', err);
    }
});

// Open Edit Modal
window.openEditModal = async function(patientId) {
    try {
        const res = await fetch('/api/patients');
        const patients = await res.json();
        const patient = patients.find(p => p._id === patientId);
        
        if (!patient) {
            alert(t('patientNotFound'));
            return;
        }
        
        // Populate form
        document.getElementById('edit-patient-id').value = patient._id;
        document.getElementById('edit-name').value = patient.name;
        document.getElementById('edit-age').value = patient.age;
        document.getElementById('edit-diagnosis').value = patient.diagnosis;
        document.getElementById('edit-status').value = patient.status;
        document.getElementById('edit-contact').value = patient.contact;
        document.getElementById('edit-doctorType').value = patient.doctorType || 'Not Assigned';
        document.getElementById('edit-examined').checked = patient.examined;
        document.getElementById('edit-treatmentDetails').value = patient.treatmentDetails || '';
        document.getElementById('edit-medicines').value = patient.medicines ? patient.medicines.join(', ') : '';
        
        // Show/hide treatment fields based on examined status
        if (patient.examined) {
            editTreatmentGroup.style.display = 'block';
            editMedicinesGroup.style.display = 'block';
        } else {
            editTreatmentGroup.style.display = 'none';
            editMedicinesGroup.style.display = 'none';
        }
        
        editModal.classList.add('active');
    } catch (err) {
        console.error('Error loading patient data:', err);
    }
};

// Update Patient
editPatientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const patientId = document.getElementById('edit-patient-id').value;
    const medicinesInput = document.getElementById('edit-medicines').value;
    const medicinesArray = medicinesInput ? medicinesInput.split(',').map(m => m.trim()).filter(m => m) : [];
    
    const updatedPatient = {
        name: document.getElementById('edit-name').value,
        age: document.getElementById('edit-age').value,
        diagnosis: document.getElementById('edit-diagnosis').value || 'Pending',
        status: document.getElementById('edit-status').value,
        contact: document.getElementById('edit-contact').value,
        doctorType: document.getElementById('edit-doctorType').value,
        examined: document.getElementById('edit-examined').checked,
        treatmentDetails: document.getElementById('edit-treatmentDetails').value,
        medicines: medicinesArray
    };

    try {
        const res = await fetch(`/api/patients/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPatient)
        });

        if (res.ok) {
            editModal.classList.remove('active');
            fetchPatients(); // Refresh list
        } else {
            alert(t('errorUpdatingPatient'));
        }
    } catch (err) {
        console.error('Error updating patient:', err);
    }
});

// Delete Patient
window.deletePatient = async function(patientId) {
    if (!confirm(t('deleteConfirm'))) {
        return;
    }
    
    try {
        const res = await fetch(`/api/patients/${patientId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            fetchPatients(); // Refresh list
        } else {
            alert(t('errorDeletingPatient'));
        }
    } catch (err) {
        console.error('Error deleting patient:', err);
    }
};

// Initial Load
fetchPatients();
