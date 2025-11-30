document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // In a real application, you would collect data and send it to a server here.
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Login attempt with:');
    console.log('Email:', email);
    console.log('Password:', password);

    // Placeholder alert
    // alert('Login form submitted! Check console for details.');
});