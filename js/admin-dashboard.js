// ================================================
// ADMIN DASHBOARD FUNCTIONS
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    initializeAdminDashboard();
    setupMenuNavigation();
});

function initializeAdminDashboard() {
    const session = getCurrentSession();
    
    if (!session || session.type !== 'admin') {
        window.location.href = 'admin_login.html';
        return;
    }

    // Display admin profile
    displayAdminProfile();
    
    // Load initial data
    loadDashboardStats();
    loadAppointments();
    loadPatients();
    loadPrescriptions();
    
    // Setup form handlers
    setupAppointmentForm();
    setupPrescriptionForm();
    setupBookAppointmentForm();
}

function setupMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            menuItems.forEach(m => m.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

function displayAdminProfile() {
    const session = getCurrentSession();
    const admin = getUserByEmail(session.email, 'admin');

    if (!admin) return;

    const profileDisplay = document.getElementById('adminProfileDisplay');
    if (!profileDisplay) return;

    profileDisplay.innerHTML = `
        <div class="profile-field">
            <strong>Nama Lengkap</strong>
            <span>${admin.name}</span>
        </div>
        <div class="profile-field">
            <strong>Email</strong>
            <span>${admin.email}</span>
        </div>
        <div class="profile-field">
            <strong>Nomor Telepon</strong>
            <span>${admin.phone}</span>
        </div>
        <div class="profile-field">
            <strong>Nomor Lisensi Medis</strong>
            <span>${admin.license}</span>
        </div>
        <div class="profile-field">
            <strong>Terdaftar Sejak</strong>
            <span>${formatDateOnly(admin.createdAt)}</span>
        </div>
    `;
}

function loadDashboardStats() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];

    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => {
        return a.date === today;
    }).length;

    document.getElementById('totalPatients').textContent = users.length;
    document.getElementById('totalAppointments').textContent = todayAppointments;
    document.getElementById('totalPrescriptions').textContent = prescriptions.length;
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const tbody = document.getElementById('appointmentsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Tidak ada janji temu</td></tr>';
        return;
    }

    appointments.forEach((apt, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${apt.patientEmail}</td>
            <td>${apt.date}</td>
            <td>${apt.time}</td>
            <td>${apt.diagnosis}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteAppointmentFromUI(${apt.id})">Hapus</button>
            </td>
        `;
    });
}

function loadPatients() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('patientsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Tidak ada data pasien</td></tr>';
        return;
    }

    users.forEach((user, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.age}</td>
            <td>${user.address}</td>
        `;
    });
}

function loadPrescriptions() {
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    const tbody = document.getElementById('prescriptionsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (prescriptions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Tidak ada data resep obat</td></tr>';
        return;
    }

    prescriptions.forEach((presc, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${presc.patientEmail}</td>
            <td>${presc.medicineName}</td>
            <td>${presc.medicineAmount}</td>
            <td>${presc.medicineDosage}</td>
            <td>${formatDateOnly(presc.createdAt)}</td>
        `;
    });
}

function setupAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const patientEmail = document.getElementById('patientEmail').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const diagnosis = document.getElementById('diagnosis').value;

        // Check if patient exists
        const patient = getUserByEmail(patientEmail, 'user');
        if (!patient) {
            alert('Email pasien tidak ditemukan!');
            return;
        }

        saveAppointment({
            patientEmail: patientEmail,
            date: date,
            time: time,
            diagnosis: diagnosis
        });

        alert('Janji temu berhasil ditambahkan!');
        form.reset();
        loadAppointments();
        loadDashboardStats();
    });
}

function setupPrescriptionForm() {
    const form = document.getElementById('prescriptionForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const patientEmail = document.getElementById('prescPatientEmail').value;
        const medicineName = document.getElementById('medicineName').value;
        const medicineAmount = document.getElementById('medicineAmount').value;
        const medicineDosage = document.getElementById('medicineDosage').value;
        const medicineNote = document.getElementById('medicineNote').value;

        // Check if patient exists
        const patient = getUserByEmail(patientEmail, 'user');
        if (!patient) {
            alert('Email pasien tidak ditemukan!');
            return;
        }

        savePrescription({
            patientEmail: patientEmail,
            medicineName: medicineName,
            medicineAmount: medicineAmount,
            medicineDosage: medicineDosage,
            medicineNote: medicineNote
        });

        alert('Resep obat berhasil ditambahkan!');
        form.reset();
        loadPrescriptions();
        loadDashboardStats();
    });
}

function setupBookAppointmentForm() {
    // This is used on user dashboard, so skip in admin
    return;
}

function deleteAppointmentFromUI(id) {
    if (confirm('Apakah Anda yakin ingin menghapus janji temu ini?')) {
        deleteAppointment(id);
        loadAppointments();
        loadDashboardStats();
    }
}
