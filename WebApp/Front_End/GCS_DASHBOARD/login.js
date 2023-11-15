const fakeEmail = "admin@admin.com";
const fakePassword = "password";
const loginForm = document.getElementById("loginForm");


//to hide/show error message when logging in
loginForm.addEventListener("submit", function (e)
{
	e.preventDefault();

	const email= document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const errorMessage = document.getElementById("error");

	const credentials = {
		email: email,
		password: password

	};

	// Make a POST request to your backend API
    fetch('https://149.28.81.138:6000/app/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // You might also need to include additional headers like authorization if required
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data);
        // You might want to redirect the user or do something else based on the response
    })
    .catch(error => {
        console.error('Error:', error);
    });

	if(fakeEmail === email && fakePassword === password) //change this to fetch login data from api
	{
		window.location.href = "index.html";
	}
	else
	{
		errorMessage.textContent = "Login failed. Please check your email and password.";
	}
});

function submitForm() {
    // Get the values from the form
	const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    // Create an object with the credentials
    const newCredentials = {
        newEmail: newEmail,
        newPassword: newPassword
    };

    // Make a POST request to your backend API
    fetch('https://your-backend-api.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // You might also need to include additional headers like authorization if required
        },
        body: JSON.stringify(newCredentials)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data);
        window.location.href = "login.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});


