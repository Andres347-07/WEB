// admin-panel.js - VERSIÓN MÍNIMA PARA CI/CD
console.log('Admin panel script loaded - CI/CD compatible');

const initializeAdminPanel = () => {
    const adminNameElement = document.getElementById('adminName');
    if (adminNameElement) {
        adminNameElement.textContent = 'Administrador TopCaps';
    }
    return true;
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminPanel);
} else {
    initializeAdminPanel();
}