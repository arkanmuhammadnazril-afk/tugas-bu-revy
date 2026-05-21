// ================================================
// AUTHENTICATION FUNCTIONS
// ================================================

// Initialize localStorage with demo data
function initializeData() {
    if (!localStorage.getItem('admins')) {
        localStorage.setItem('admins', JSON.stringify([
            {
                id: 1,
                name: 'Dr. Budi Santoso',
                email: 'budi@healthcare.com',
                phone: '08123456789',
                license: 'ST-001-2024',
                password: 'admin123',
                type: 'admin'
            }
        ]));
    }

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            {
                id: 1,
                name: 'Andi Wijaya',
                email: 'andi@gmail.com',
                phone: '08987654321',
                age: 28,
                address: 'Jalan Merdeka No. 123',
                password: 'user123',
                type: 'user'
            }
        ]));
    }

    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([]));
    }

    if (!localStorage.getItem('prescriptions')) {
        localStorage.setItem('prescriptions', JSON.stringify([]));
    }

    if (!localStorage.getItem('medicalRecords')) {
        localStorage.setItem('medicalRecords', JSON.stringify([]));
    }
}

// Initialize data on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    checkSession();
});

// Register user
function registerUser(type, userData) {
    const key = type === 'admin' ? 'admins' : 'users';
    let users = JSON.parse(localStorage.getItem(key)) || [];

    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
        alert('Email sudah terdaftar! Gunakan email lain.');
        return;
    }

    // Create new user object
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
        type: type,
        createdAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem(key, JSON.stringify(users));

    alert(`Pendaftaran ${type === 'admin' ? 'admin' : 'user'} berhasil! Silakan login.`);
    
    // Redirect to login page
    if (type === 'admin') {
        window.location.href = 'admin_login.html';
    } else {
        window.location.href = 'user_login.html';
    }
}

// Login user
function loginUser(type, email, password) {
    const key = type === 'admin' ? 'admins' : 'users';
    const users = JSON.parse(localStorage.getItem(key)) || [];

    // Find user with email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Email atau password salah!');
        return;
    }

    // Store session
    const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: type,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentSession', JSON.stringify(session));

    // Redirect to dashboard
    if (type === 'admin') {
        window.location.href = 'admin_dashboard.html';
    } else {
        window.location.href = 'user_dashboard.html';
    }
}

// Check if user is logged in
function checkSession() {
    const session = localStorage.getItem('currentSession');
    const currentPage = window.location.pathname;

    if (!session) {
        // If trying to access dashboard without login, redirect to login
        if (currentPage.includes('dashboard')) {
            window.location.href = 'index.html';
        }
        return false;
    }

    const sessionData = JSON.parse(session);
    
    // Redirect to correct dashboard if accessing wrong pages
    if (sessionData.type === 'admin' && !currentPage.includes('admin_dashboard')) {
        // Allow access to other pages but mark session
    } else if (sessionData.type === 'user' && !currentPage.includes('user_dashboard')) {
        // Allow access to other pages but mark session
    }

    // Update UI with user name
    const userNameDisplay = document.getElementById('adminNameDisplay') || 
                           document.getElementById('userNameDisplay');
    if (userNameDisplay) {
        userNameDisplay.textContent = `Halo, ${sessionData.name}`;
    }

    return sessionData;
}

// Logout user
function logout(type) {
    event.preventDefault();
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('currentSession');
        window.location.href = 'index.html';
    }
}

// Get current session
function getCurrentSession() {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
}

// Get user data by email
function getUserByEmail(email, type) {
    const key = type === 'admin' ? 'admins' : 'users';
    const users = JSON.parse(localStorage.getItem(key)) || [];
    return users.find(u => u.email === email);
}

// Update user profile
function updateUserProfile(type, email, updatedData) {
    const key = type === 'admin' ? 'admins' : 'users';
    let users = JSON.parse(localStorage.getItem(key)) || [];

    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem(key, JSON.stringify(users));
        return true;
    }
    return false;
}

// Password validation
function validatePassword(password) {
    return password.length >= 6;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================================
// APPOINTMENT FUNCTIONS
// ================================================

function saveAppointment(appointmentData) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    const newAppointment = {
        id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
        ...appointmentData,
        createdAt: new Date().toISOString(),
        status: 'scheduled'
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    return newAppointment;
}

function getAppointmentsByEmail(email) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    return appointments.filter(a => a.patientEmail === email || a.userEmail === email);
}

function deleteAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments = appointments.filter(a => a.id !== id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// ================================================
// PRESCRIPTION FUNCTIONS
// ================================================

function savePrescription(prescriptionData) {
    let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    
    const newPrescription = {
        id: prescriptions.length > 0 ? Math.max(...prescriptions.map(p => p.id)) + 1 : 1,
        ...prescriptionData,
        createdAt: new Date().toISOString()
    };

    prescriptions.push(newPrescription);
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    return newPrescription;
}

function getPrescriptionsByEmail(email) {
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    return prescriptions.filter(p => p.patientEmail === email || p.userEmail === email);
}

function deletePrescription(id) {
    let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    prescriptions = prescriptions.filter(p => p.id !== id);
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
}

// ================================================
// MEDICAL RECORDS FUNCTIONS
// ================================================

function saveMedicalRecord(recordData) {
    let records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    
    const newRecord = {
        id: records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1,
        ...recordData,
        createdAt: new Date().toISOString()
    };

    records.push(newRecord);
    localStorage.setItem('medicalRecords', JSON.stringify(records));
    return newRecord;
}

function getMedicalRecordsByEmail(email) {
    const records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    return records.filter(r => r.patientEmail === email || r.userEmail === email);
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function formatDateOnly(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}
