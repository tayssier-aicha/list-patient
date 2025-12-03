const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
dotenv.config();
// Arabic doctor names for each specialization
const doctorData = {
    'General Practitioner': [
        'د. أحمد العلي',
        'د. فاطمة الزهراني',
        'د. محمد السعيد',
        'د. نور الدين حسن',
        'د. ليلى المصري'
    ],
    'Cardiologist': [
        'د. كريم القلب',
        'د. سارة الحكيم',
        'د. عمر الشافعي',
        'د. مريم النجار'
    ],
    'Neurologist': [
        'د. ياسر العصبي',
        'د. هدى المنصور',
        'د. طارق الفهد',
        'د. رنا الصالح'
    ],
    'Dermatologist': [
        'د. زينب الجميل',
        'د. خالد البشرة',
        'د. أمل الحسني',
        'د. سامر العطار'
    ],
    'Pediatrician': [
        'د. ريم الأطفال',
        'د. عبد الله الرحيم',
        'د. نادية الصغار',
        'د. يوسف الطفل',
        'د. دينا المحبة'
    ],
    'Orthopedist': [
        'د. عادل العظام',
        'د. سلمى القوية',
        'د. حسام المفاصل',
        'د. إيمان الصحة'
    ],
    'Psychiatrist': [
        'د. منى النفس',
        'د. وليد الأمان',
        'د. شيماء الراحة',
        'د. فادي الهدوء'
    ],
    'Other': [
        'د. علي العام',
        'د. لينا الشاملة',
        'د. بشار المتنوع'
    ]
};
async function seedDoctors() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing doctors
        await Doctor.deleteMany({});
        console.log('Cleared existing doctors');

        // Create doctors
        const doctors = [];
        for (const [type, names] of Object.entries(doctorData)) {
            for (const name of names) {
                doctors.push({
                    name,
                    type,
                    patientCount: 0
                });
            }
        }
        await Doctor.insertMany(doctors);
        console.log(`Successfully seeded ${doctors.length} doctors`);

        // Display summary
        for (const [type, names] of Object.entries(doctorData)) {
            console.log(`${type}: ${names.length} doctors`);
        }
        process.exit(0);
    } catch (err) {
        console.error('Error seeding doctors:', err);
        process.exit(1);
    }
}
seedDoctors();
