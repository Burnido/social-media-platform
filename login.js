// Simple authentication system using localStorage

// Initialize users in localStorage if not already present
function initializeUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Add demo user if no users exist
    if (users.length === 0) {
        const demoUser = {
            id: 1,
            username: 'demo',
            email: 'demo@basher.com',
            password: 'demo123' // In a real app, this would be hashed
        };
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Redirect to index if already logged in
function checkIfAlreadyLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// Login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by username or email
    const user = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email
        }));
        
        // Redirect to main page
        window.location.href = 'index.html';
    } else {
        alert('Invalid username/email or password!');
        document.getElementById('password').value = '';
    }
});

// Signup handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
        alert('Username already taken!');
        return;
    }
    
    if (users.some(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password // In a real app, this would be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login the new user
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    }));
    
    alert('Account created successfully!');
    window.location.href = 'index.html';
});

// Modal functionality
const signupBtn = document.getElementById('signupBtn');
const signupModal = document.getElementById('signupModal');
const closeSignup = document.getElementById('closeSignup');

signupBtn.addEventListener('click', function() {
    signupModal.style.display = 'block';
});

closeSignup.addEventListener('click', function() {
    signupModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Initialize on page load
initializeUsers();
checkIfAlreadyLoggedIn();
