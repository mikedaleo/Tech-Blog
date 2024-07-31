const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace('/');
    } else {
        console.log(response)
       alert('Incorrect email or password, please try again');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        // Parse the response body to get a more detailed error message
        const errorData = await response.json();
        console.log('Error:', errorData);
        alert(`Error: ${errorData.msg.join(', ')}`);
      }
    } catch (err) {
      console.log('Network Error:', err);
      alert('Network error, please try again later.');
    }
  } else {
    alert('Please fill in all fields.');
  }
};


  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
