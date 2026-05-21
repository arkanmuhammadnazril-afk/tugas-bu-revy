// ================================================
// USER DASHBOARD FUNCTIONS
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    initializeUserDashboard();
    setupMenuNavigation();
});

function initializeUserDashboard() {
    const session = getCurrentSession();
    
    if (!session || session.type !== 'user') {
        window.location.href = 'user_login.html';
        return;
    }

    // Display user profile
    displayUserProfile();
    
    // Load initial data
    loadUserDashboardStats();
    loadUserAppointments();
    loadMedicalRecords();
    loadUserPrescriptions();
    
    // Setup form handlers
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

function displayUserProfile() {
    const session = getCurrentSession();
    const user = getUserByEmail(session.email, 'user');

    if (!user) return;

    const profileDisplay = document.getElementById('userProfileDisplay');
    if (!profileDisplay) return;

    profileDisplay.innerHTML = `
        <div class="profile-field">
            <strong>Nama Lengkap</strong>
            <span>${user.name}</span>
        </div>
        <div class="profile-field">
            <strong>Email</strong>
            <span>${user.email}</span>
        </div>
        <div class="profile-field">
            <strong>Nomor Telepon</strong>
            <span>${user.phone}</span>
        </div>
        <div class="profile-field">
            <strong>Usia</strong>
            <span>${user.age} tahun</span>
        </div>
        <div class="profile-field">
            <strong>Alamat</strong>
            <span>${user.address}</span>
        </div>
        <div class="profile-field">
            <strong>Terdaftar Sejak</strong>
            <span>${formatDateOnly(user.createdAt)}</span>
        </div>
    `;
}

function loadUserDashboardStats() {
    const session = getCurrentSession();
    const appointments = getAppointmentsByEmail(session.email);
    const medicalRecords = getMedicalRecordsByEmail(session.email);
    const prescriptions = getPrescriptionsByEmail(session.email);

    document.getElementById('userAppointments').textContent = appointments.length;
    document.getElementById('userRecords').textContent = medicalRecords.length;
    document.getElementById('userPrescriptions').textContent = prescriptions.length;
}

function loadUserAppointments() {
    const session = getCurrentSession();
    const appointments = getAppointmentsByEmail(session.email);
    const tbody = document.getElementById('userAppointmentsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Anda belum memiliki janji temu</td></tr>';
        return;
    }

    appointments.forEach((apt, index) => {
        const row = tbody.insertRow();
        const status = new Date(apt.date) > new Date() ? 'Dijadwalkan' : 'Selesai';
        const statusColor = status === 'Dijadwalkan' ? '#3498db' : '#2ecc71';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${apt.date}</td>
            <td>${apt.time}</td>
            <td>${apt.diagnosis}</td>
            <td><span style="background-color: ${statusColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;">${status}</span></td>
        `;
    });
}

function loadMedicalRecords() {
    const session = getCurrentSession();
    const records = getMedicalRecordsByEmail(session.email);
    const tbody = document.getElementById('medicalRecordsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Anda belum memiliki riwayat medis</td></tr>';
        return;
    }

    records.forEach((record, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatDateOnly(record.visitDate)}</td>
            <td>${record.complaint}</td>
            <td>${record.diagnosis}</td>
            <td>${record.notes}</td>
        `;
    });
}

function loadUserPrescriptions() {
    const session = getCurrentSession();
    const prescriptions = getPrescriptionsByEmail(session.email);
    const tbody = document.getElementById('userPrescriptionsBody');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (prescriptions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Anda belum memiliki resep obat</td></tr>';
        return;
    }

    prescriptions.forEach((presc, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${presc.medicineName}</td>
            <td>${presc.medicineAmount}</td>
            <td>${presc.medicineDosage}</td>
            <td>${formatDateOnly(presc.createdAt)}</td>
            <td>${presc.medicineNote || '-'}</td>
        `;
    });
}

function setupBookAppointmentForm() {
    const form = document.getElementById('bookAppointmentForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const session = getCurrentSession();
        const date = document.getElementById('bookDate').value;
        const time = document.getElementById('bookTime').value;
        const reason = document.getElementById('bookReason').value;

        // Validate date is in future
        const appointmentDate = new Date(date + ' ' + time);
        if (appointmentDate < new Date()) {
            alert('Tanggal dan jam harus di masa depan!');
            return;
        }

        saveAppointment({
            userEmail: session.email,
            patientEmail: session.email,
            date: date,
            time: time,
            diagnosis: reason,
            status: 'pending'
        });

        alert('Janji temu berhasil dipesan! Dokter akan segera merespon permohonan Anda.');
        form.reset();
        loadUserAppointments();
        loadUserDashboardStats();
    });
}

function cancelAppointment(id) {
    if (confirm('Apakah Anda yakin ingin membatalkan janji temu ini?')) {
        deleteAppointment(id);
        loadUserAppointments();
        loadUserDashboardStats();
    }
}
