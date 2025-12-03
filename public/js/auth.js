const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const switchBtn = document.getElementById('switch-btn');
const switchText = document.getElementById('switch-text');
const authTitle = document.querySelector('.auth-title');
const submitBtn = authForm.querySelector('button');
const signupFields = document.getElementById('signup-fields');

// New Inputs
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');

let isLogin = true;

// Check if already logged in
if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
}

switchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    if (isLogin) {
        authTitle.textContent = 'Welcome Back';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign Up';
        signupFields.style.display = 'none';
        
        // Remove required attribute when in login mode
        firstNameInput.removeAttribute('required');
        lastNameInput.removeAttribute('required');
        emailInput.removeAttribute('required');
    } else {
        authTitle.textContent = 'Create Account';
        submitBtn.textContent = 'Sign Up';
        switchText.textContent = 'Already have an account?';
        switchBtn.textContent = 'Sign In';
        signupFields.style.display = 'block';
        
        // Add required attribute when in signup mode
        firstNameInput.setAttribute('required', 'true');
        lastNameInput.setAttribute('required', 'true');
        emailInput.setAttribute('required', 'true');
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    const payload = { username, password };

    if (!isLogin) {
        payload.firstName = firstNameInput.value;
        payload.lastName = lastNameInput.value;
        payload.email = emailInput.value;
    }

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.msg || 'An error occurred');
        }
    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});
