// Translation system
const translations = {
    en: {
        // Header
        dashboardTitle: 'Patient Dashboard',
        viewDoctorsBtn: 'View Doctors',
        addPatientBtn: 'Add Patient',
        logoutBtn: 'Logout',
        
        // Patient Card
        age: 'Age',
        diagnosis: 'Diagnosis',
        contact: 'Contact',
        doctorType: 'Doctor Type',
        assignedDoctor: 'Assigned Doctor',
        examined: 'Examined',
        yes: 'Yes',
        no: 'No',
        treatmentDetails: 'Treatment Details',
        medicines: 'Medicines',
        noDetailsProvided: 'No details provided',
        notAssigned: 'Not Assigned',
        editBtn: 'Edit',
        deleteBtn: 'Delete',
        
        // Modals
        addPatientTitle: 'Add New Patient',
        editPatientTitle: 'Edit Patient',
        viewDoctorsTitle: 'All Doctors by Specialization',
        
        // Form Fields
        fullName: 'Full Name',
        enterName: 'Enter full name',
        enterAge: 'Enter age',
        enterDiagnosis: 'Enter diagnosis',
        pending: 'Pending',
        status: 'Status',
        waiting: 'Waiting',
        diagnosed: 'Diagnosed',
        treated: 'Treated',
        contactNumber: 'Contact Number',
        enterContact: 'Enter contact number',
        patientExamined: 'Patient has been examined',
        treatmentDetailsLabel: 'Treatment Details',
        treatmentPlaceholder: 'Describe the treatment provided...',
        medicinesLabel: 'Medicines Prescribed',
        medicinesPlaceholder: 'Enter medicines separated by commas',
        medicinesHint: 'Separate multiple medicines with commas',
        updatePatientBtn: 'Update Patient',
        
        // Doctor Types
        generalPractitioner: 'General Practitioner',
        cardiologist: 'Cardiologist',
        neurologist: 'Neurologist',
        dermatologist: 'Dermatologist',
        pediatrician: 'Pediatrician',
        orthopedist: 'Orthopedist',
        psychiatrist: 'Psychiatrist',
        other: 'Other',
        
        // Messages
        noPatients: 'No patients found. Add one to get started.',
        deleteConfirm: 'Are you sure you want to delete this patient? This action cannot be undone.',
        errorAddingPatient: 'Error adding patient',
        errorUpdatingPatient: 'Error updating patient',
        errorDeletingPatient: 'Error deleting patient',
        patientNotFound: 'Patient not found',
        errorLoadingDoctors: 'Error loading doctors',
        patients: 'Patients',
    },
    fr: {
        // Header
        dashboardTitle: 'Tableau de Bord des Patients',
        viewDoctorsBtn: 'Voir les Médecins',
        addPatientBtn: 'Ajouter un Patient',
        logoutBtn: 'Déconnexion',
        
        // Patient Card
        age: 'Âge',
        diagnosis: 'Diagnostic',
        contact: 'Contact',
        doctorType: 'Type de Médecin',
        assignedDoctor: 'Médecin Assigné',
        examined: 'Examiné',
        yes: 'Oui',
        no: 'Non',
        treatmentDetails: 'Détails du Traitement',
        medicines: 'Médicaments',
        noDetailsProvided: 'Aucun détail fourni',
        notAssigned: 'Non Assigné',
        editBtn: 'Modifier',
        deleteBtn: 'Supprimer',
        
        // Modals
        addPatientTitle: 'Ajouter un Nouveau Patient',
        editPatientTitle: 'Modifier le Patient',
        viewDoctorsTitle: 'Tous les Médecins par Spécialisation',
        
        // Form Fields
        fullName: 'Nom Complet',
        enterName: 'Entrez le nom complet',
        enterAge: 'Entrez l\'âge',
        enterDiagnosis: 'Entrez le diagnostic',
        pending: 'En Attente',
        status: 'Statut',
        waiting: 'En Attente',
        diagnosed: 'Diagnostiqué',
        treated: 'Traité',
        contactNumber: 'Numéro de Contact',
        enterContact: 'Entrez le numéro de contact',
        patientExamined: 'Le patient a été examiné',
        treatmentDetailsLabel: 'Détails du Traitement',
        treatmentPlaceholder: 'Décrivez le traitement fourni...',
        medicinesLabel: 'Médicaments Prescrits',
        medicinesPlaceholder: 'Entrez les médicaments séparés par des virgules',
        medicinesHint: 'Séparez plusieurs médicaments par des virgules',
        updatePatientBtn: 'Mettre à Jour le Patient',
        
        // Doctor Types
        generalPractitioner: 'Médecin Généraliste',
        cardiologist: 'Cardiologue',
        neurologist: 'Neurologue',
        dermatologist: 'Dermatologue',
        pediatrician: 'Pédiatre',
        orthopedist: 'Orthopédiste',
        psychiatrist: 'Psychiatre',
        other: 'Autre',
        
        // Messages
        noPatients: 'Aucun patient trouvé. Ajoutez-en un pour commencer.',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce patient? Cette action ne peut pas être annulée.',
        errorAddingPatient: 'Erreur lors de l\'ajout du patient',
        errorUpdatingPatient: 'Erreur lors de la mise à jour du patient',
        errorDeletingPatient: 'Erreur lors de la suppression du patient',
        patientNotFound: 'Patient non trouvé',
        errorLoadingDoctors: 'Erreur lors du chargement des médecins',
        patients: 'Patients',
    },
    ar: {
        // Header
        dashboardTitle: 'لوحة تحكم المرضى',
        viewDoctorsBtn: 'عرض الأطباء',
        addPatientBtn: 'إضافة مريض',
        logoutBtn: 'تسجيل الخروج',
        
        // Patient Card
        age: 'العمر',
        diagnosis: 'التشخيص',
        contact: 'جهة الاتصال',
        doctorType: 'نوع الطبيب',
        assignedDoctor: 'الطبيب المعين',
        examined: 'تم الفحص',
        yes: 'نعم',
        no: 'لا',
        treatmentDetails: 'تفاصيل العلاج',
        medicines: 'الأدوية',
        noDetailsProvided: 'لا توجد تفاصيل',
        notAssigned: 'غير معين',
        editBtn: 'تعديل',
        deleteBtn: 'حذف',
        
        // Modals
        addPatientTitle: 'إضافة مريض جديد',
        editPatientTitle: 'تعديل المريض',
        viewDoctorsTitle: 'جميع الأطباء حسب التخصص',
        
        // Form Fields
        fullName: 'الاسم الكامل',
        enterName: 'أدخل الاسم الكامل',
        enterAge: 'أدخل العمر',
        enterDiagnosis: 'أدخل التشخيص',
        pending: 'قيد الانتظار',
        status: 'الحالة',
        waiting: 'في الانتظار',
        diagnosed: 'تم التشخيص',
        treated: 'تم العلاج',
        contactNumber: 'رقم الاتصال',
        enterContact: 'أدخل رقم الاتصال',
        patientExamined: 'تم فحص المريض',
        treatmentDetailsLabel: 'تفاصيل العلاج',
        treatmentPlaceholder: 'صف العلاج المقدم...',
        medicinesLabel: 'الأدوية الموصوفة',
        medicinesPlaceholder: 'أدخل الأدوية مفصولة بفواصل',
        medicinesHint: 'افصل الأدوية المتعددة بفواصل',
        updatePatientBtn: 'تحديث المريض',
        
        // Doctor Types
        generalPractitioner: 'طبيب عام',
        cardiologist: 'طبيب قلب',
        neurologist: 'طبيب أعصاب',
        dermatologist: 'طبيب جلدية',
        pediatrician: 'طبيب أطفال',
        orthopedist: 'طبيب عظام',
        psychiatrist: 'طبيب نفسي',
        other: 'آخر',
        
        // Messages
        noPatients: 'لم يتم العثور على مرضى. أضف واحداً للبدء.',
        deleteConfirm: 'هل أنت متأكد من رغبتك في حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.',
        errorAddingPatient: 'خطأ في إضافة المريض',
        errorUpdatingPatient: 'خطأ في تحديث المريض',
        errorDeletingPatient: 'خطأ في حذف المريض',
        patientNotFound: 'المريض غير موجود',
        errorLoadingDoctors: 'خطأ في تحميل الأطباء',
        patients: 'المرضى',
    }
};

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to translate text
function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML direction for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
    
    // Update all UI elements
    updateUILanguage();
}

// Function to update all UI text
function updateUILanguage() {
    // Update header
    document.querySelector('.dashboard-title').textContent = t('dashboardTitle');
    document.getElementById('view-doctors-btn').textContent = t('viewDoctorsBtn');
    document.getElementById('add-patient-btn').textContent = t('addPatientBtn');
    document.getElementById('logout-btn').textContent = t('logoutBtn');
    
    // Update modal titles
    document.querySelector('#add-modal h2').textContent = t('addPatientTitle');
    document.querySelector('#edit-modal h2').textContent = t('editPatientTitle');
    document.querySelector('#doctors-modal h2').textContent = t('viewDoctorsTitle');
    
    // Update form labels and placeholders - Add Patient Form
    updateFormLabels('', '');
    
    // Update form labels and placeholders - Edit Patient Form
    updateFormLabels('edit-', 'edit-');
    
    // Refresh patient cards
    fetchPatients();
}

function updateFormLabels(prefix, idPrefix) {
    const labels = {
        'name': 'fullName',
        'age': 'age',
        'diagnosis': 'diagnosis',
        'status': 'status',
        'contact': 'contactNumber',
        'doctorType': 'doctorType',
        'treatmentDetails': 'treatmentDetailsLabel',
        'medicines': 'medicinesLabel'
    };
    
    for (const [field, translationKey] of Object.entries(labels)) {
        const label = document.querySelector(`label[for="${idPrefix}${field}"]`);
        if (label && !label.querySelector('input')) {
            label.textContent = t(translationKey);
        }
    }
    
    // Update placeholders
    const nameInput = document.getElementById(`${idPrefix}name`);
    if (nameInput) nameInput.placeholder = t('enterName');
    
    const diagnosisInput = document.getElementById(`${idPrefix}diagnosis`);
    if (diagnosisInput) diagnosisInput.placeholder = t('pending');
    
    const contactInput = document.getElementById(`${idPrefix}contact`);
    if (contactInput) contactInput.placeholder = t('enterContact');
    
    const treatmentInput = document.getElementById(`${idPrefix}treatmentDetails`);
    if (treatmentInput) treatmentInput.placeholder = t('treatmentPlaceholder');
    
    const medicinesInput = document.getElementById(`${idPrefix}medicines`);
    if (medicinesInput) medicinesInput.placeholder = t('medicinesPlaceholder');
    
    // Update button text
    const submitBtn = document.querySelector(`#${prefix}patient-form button[type="submit"]`);
    if (submitBtn) {
        submitBtn.textContent = prefix === 'edit-' ? t('updatePatientBtn') : t('addPatientBtn');
    }
    
    // Update status options
    const statusSelect = document.getElementById(`${idPrefix}status`);
    if (statusSelect) {
        statusSelect.options[0].textContent = t('waiting');
        statusSelect.options[1].textContent = t('diagnosed');
        statusSelect.options[2].textContent = t('treated');
    }
    
    // Update doctor type options
    const doctorTypeSelect = document.getElementById(`${idPrefix}doctorType`);
    if (doctorTypeSelect) {
        doctorTypeSelect.options[0].textContent = t('notAssigned');
        doctorTypeSelect.options[1].textContent = t('generalPractitioner');
        doctorTypeSelect.options[2].textContent = t('cardiologist');
        doctorTypeSelect.options[3].textContent = t('neurologist');
        doctorTypeSelect.options[4].textContent = t('dermatologist');
        doctorTypeSelect.options[5].textContent = t('pediatrician');
        doctorTypeSelect.options[6].textContent = t('orthopedist');
        doctorTypeSelect.options[7].textContent = t('psychiatrist');
        doctorTypeSelect.options[8].textContent = t('other');
    }
}
