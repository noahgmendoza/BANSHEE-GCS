const fakeEmail = "admin@admin.com";
const fakePassword = "password";
const loginForm = document.getElementById("loginForm");



loginForm.addEventListener("submit", function (e)
{
	e.preventDefault();

	const inputEmail= document.getElementById("email").value;
	const inputPassword = document.getElementById("password").value;
	const errorMessage = document.getElementById("error");

	if(fakeEmail === inputEmail && fakePassword === inputPassword)
	{
		window.location.href = "index.html";
	}
	else
	{
		errorMessage.textContent = "Login failed. Please check your email and password.";
	}
});


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
