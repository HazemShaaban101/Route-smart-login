// check if there is a list of users saved in localStorage
if (localStorage.getItem("listOfUsers") == null) {
	var listOfUsers = [];
} else {
	// if users JSON is saved inside LocalStorage, retrieve it and save it inside
	// listOfUsers array, then check if a user object is defined inside localStorage
	// if a user object is defined, it means the user successfully signed in,
	// and should be forwarded to dashboard.
	var listOfUsers = JSON.parse(localStorage.getItem("listOfUsers"));

	if (localStorage.getItem("verifiedUser") !== null) {
		window.location.replace("./pages/home.html");
	}
}
document.getElementById("login-btn").addEventListener("click", function () {
	if (!checkEmailValidity()) {
		return;
	}
	if (!checkDataMatch()) {
		return;
	}
	window.location.replace("./pages/home.html");
});

function checkEmailValidity() {
	email = document.getElementById("email-input").value;

	emailRegex =
		/^[a-z0-9]{1,}[_\-\.]{0,1}[a-z0-9]{1,}([\-_.]{0,1}[a-z0-9]{1,}){0,}@[a-z0-9]{1,}[\-]{0,1}[a-z0-9]([\-]{0,1}[a-z0-9]{1,}){0,}\.[a-z]{2,}$/i;
	if (emailRegex.test(email) === true) {
		return true;
	} else {
		document.getElementById("not-found").classList.add("d-none");
		document.getElementById("email-format").classList.remove("d-none");
		return false;
	}
}

function checkDataMatch() {
	for (var i = 0; i < listOfUsers.length; i++) {
		if (
			listOfUsers[i].email ===
				document.getElementById("email-input").value &&
			listOfUsers[i].password ===
				document.getElementById("password-input").value
		) {
			localStorage.setItem(
				"verifiedUser",
				JSON.stringify(listOfUsers[i])
			);
			return true;
		}
	}
	document.getElementById("email-format").classList.add("d-none");
	document.getElementById("not-found").classList.remove("d-none");
	return false;
}
