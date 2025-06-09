document.addEventListener('DOMContentLoaded', () => {
    const isStaffCheckbox = document.getElementById('isStaff');
    const passwordGroup = document.querySelector('.password-group');
    const loginForm = document.getElementById('loginForm');
    const helpMessage = document.getElementById('helpMessage');
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');

    // Function to toggle password field visibility
    isStaffCheckbox.addEventListener('change', () => {
        if (isStaffCheckbox.checked) {
            passwordGroup.classList.add('visible');
            passwordGroup.classList.remove('hidden');
            setTimeout(() => {
                const passwordInput = document.getElementById('password');
                if (passwordInput) {
                    passwordInput.focus();
                }
            }, 400); // Small delay to allow CSS transition
        } else {
            passwordGroup.classList.add('hidden');
            passwordGroup.classList.remove('visible');
            const passwordInput = document.getElementById('password');
            if (passwordInput) {
                passwordInput.value = ''; // Clear password when hidden
            }
        }
    });

    // Function to show help message
    const showHelpMessage = () => {
        helpMessage.classList.add('visible');
    };

    // Function to hide help message
    const hideHelpMessage = () => {
        helpMessage.classList.remove('visible');
    };

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = document.getElementById('password').value.trim();
        const isStaff = isStaffCheckbox.checked;

        hideHelpMessage(); // Hide any previous error message

        if (username === '') {
            showHelpMessage();
            usernameInput.focus();
            return;
        }

        if (isStaff && password === '') {
            showHelpMessage();
            document.getElementById('password').focus();
            return;
        }

        // --- Simplified Login Logic for static page ---
        // In a real application, you'd send this data to a server.
        // For demonstration, simulate a failure if username is "error"
        // or if staff login fails (e.g., specific username/password combo)
        if (username.toLowerCase() === 'error' || (isStaff && (username.toLowerCase() !== 'staff' || password !== '12345'))) {
            showHelpMessage();
            // Clear password if login fails
            if (document.getElementById('password')) {
                document.getElementById('password').value = '';
            }
        } else {
            // Simulate successful login - in a real app, redirect or show success message
            alert(`Login Berhasil! Selamat datang, ${username}!`);
            loginForm.reset(); // Clear form fields
            if (isStaffCheckbox.checked) { // If staff checkbox was checked, reset it and hide password field
                isStaffCheckbox.checked = false;
                passwordGroup.classList.add('hidden');
                passwordGroup.classList.remove('visible');
            }
        }
    });

    // Ripple effect for the button
    loginBtn.addEventListener('click', (e) => {
        const button = e.target.closest('.login-button');
        if (!button) return;

        const ripple = document.createElement('span');
        ripple.classList.add('button-ripple');

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - (button.getBoundingClientRect().left + radius)}px`;
        ripple.style.top = `${e.clientY - (button.getBoundingClientRect().top + radius)}px`;

        button.appendChild(ripple);

        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});