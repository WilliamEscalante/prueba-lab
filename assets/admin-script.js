const doctors = [
    {
        id: 1,
        slug: "dr-juan-perez",
        name: "Dr. Juan Pérez Mendoza",
        specialty: "Cardiología",
        registration: "CM-12345",
        phone: "+591 3 123-4567",
        city: "Santa Cruz"
    },
    {
        id: 2,
        slug: "dra-maria-lopez",
        name: "Dra. María López García",
        specialty: "Pediatría",
        registration: "CM-23456",
        phone: "+591 3 234-5678",
        city: "Santa Cruz"
    },
    {
        id: 3,
        slug: "dr-carlos-ramirez",
        name: "Dr. Carlos Ramírez Silva",
        specialty: "Dermatología",
        registration: "CM-34567",
        phone: "+591 3 345-6789",
        city: "Santa Cruz"
    }
];

let currentURL = '';

function init() {
    renderStats();
    renderDoctors(doctors); // Aseguro que las tarjetas se rendericen al cargar
    setupSearch();
}

function renderStats() {
    const numDoctores = doctors.length;
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${numDoctores}</div>
            <div class="stat-label">Médicos Activos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${numDoctores}</div>
            <div class="stat-label">Páginas Generadas</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${numDoctores}</div>
            <div class="stat-label">Códigos QR</div>
        </div>
    `;
}

function renderDoctors(list) {
    const grid = document.getElementById('doctorsGrid');
    grid.innerHTML = '';

    list.forEach(doctor => {
        const initials = doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2);
        const pageURL = `doctores/${doctor.slug}/perfil.html`;
        
        grid.innerHTML += `
            <div class="doctor-card">
                <div class="doctor-header">
                    <div class="doctor-initials">${initials}</div>
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-specialty">${doctor.specialty}</div>
                </div>
                <div class="doctor-info">
                    <div class="info-row">
                        <div class="info-label">Colegiatura</div>
                        <div class="info-value">${doctor.registration}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Teléfono</div>
                        <div class="info-value">${doctor.phone}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Ciudad</div>
                        <div class="info-value">${doctor.city}</div>
                    </div>
                </div>
                <div class="doctor-actions">
                    <a href="${pageURL}" target="_blank" class="btn btn-primary"><i class="fas fa-eye"></i> Ver Página</a>
                    <button class="btn btn-success" onclick='showQR("${doctor.name}", "${pageURL}")'><i class="fas fa-qrcode"></i> Ver QR</button>
                </div>
            </div>
        `;
    });
}

function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = doctors.filter(d => 
            d.name.toLowerCase().includes(term) ||
            d.specialty.toLowerCase().includes(term) ||
            d.city.toLowerCase().includes(term)
        );
        renderDoctors(filtered);
    });
}

function showQR(name, url) {
    const baseURL = window.location.origin + '/laboratorio-doctores/';
    currentURL = baseURL + url;
    
    document.getElementById('modalDoctorName').textContent = name;
    document.getElementById('doctorURL').textContent = currentURL;
    document.getElementById('qrModal').classList.add('active');
}

function closeModal() {
    document.getElementById('qrModal').classList.remove('active');
}

function copyURL() {
    navigator.clipboard.writeText(currentURL).then(() => {
        alert('✅ URL copiada al portapapeles');
    });
}

document.getElementById('qrModal').addEventListener('click', (e) => {
    if (e.target.id === 'qrModal') closeModal();
});

init();