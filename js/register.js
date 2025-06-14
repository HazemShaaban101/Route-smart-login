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
		window.location.replace("../pages/home.html");
	}
}

// events for input box validation through regex
for (
	var i = 0, inputBoxes = document.querySelectorAll("input");
	i < inputBoxes.length;
	i++
) {
	inputBoxes[i].addEventListener("input", function (e) {
		// regex for validating inputs
		var regex = {
			"name-input": /^[a-z]{3,}$/i,
			"email-input":
				/^[a-z0-9]{1,}[_\-\.]{0,1}[a-z0-9]{1,}([\-_.]{0,1}[a-z0-9]{1,}){0,}@[a-z0-9]{1,}[\-]{0,1}[a-z0-9]([\-]{0,1}[a-z0-9]{1,}){0,}\.[a-z]{2,}$/i,
			"password-input": /^\S{8,}$/,
		};

		// validate the input from the box with the corresponding regex
		if (regex[e.target.id].test(e.target.value)) {
			e.target.classList.remove("is-invalid");
			e.target.classList.add("is-valid");
		} else {
			e.target.classList.add("is-invalid");
			e.target.classList.remove("is-valid");
		}
	});
}

document.getElementById("sign-up-btn").addEventListener("click", function () {
	if (!inputsValid()) {
		return;
	}
	if (!isNewEmail(document.getElementById("email-input").value)) {
		return;
	}

	var user = {
		name: document.getElementById("name-input").value,
		email: document.getElementById("email-input").value,
		password: document.getElementById("password-input").value,
	};
	addNewUser(user);
});

function inputsValid() {
	// loop over all inputs, and check if any doesn't have is-valid class
	// return false. if all has it, return true.
	for (
		var i = 0, inputBoxes = document.querySelectorAll("input");
		i < inputBoxes.length;
		i++
	) {
		if (!inputBoxes[i].classList.contains("is-valid")) {
			// show invalid input message
			document
				.getElementById("invalid-inputs")
				.classList.remove("d-none");
			document.getElementById("used-email").classList.add("d-none");
			document.getElementById("successful-add").classList.add("d-none");
			return false;
		}
	}
	return true;
}

function isNewEmail(email) {
	for (var i = 0; i < listOfUsers.length; i++) {
		if (listOfUsers[i].email === email) {
			// show used email message
			document.getElementById("invalid-inputs").classList.add("d-none");
			document.getElementById("used-email").classList.remove("d-none");
			document.getElementById("successful-add").classList.add("d-none");
			return false;
		}
	}
	return true;
}

function addNewUser(user) {
	// add user to users array and save it to local storage
	listOfUsers.push(user);
	localStorage.setItem("listOfUsers", JSON.stringify(listOfUsers));
	// show success message
	document.getElementById("invalid-inputs").classList.add("d-none");
	document.getElementById("used-email").classList.add("d-none");
	document.getElementById("successful-add").classList.remove("d-none");

	// redirect user to sign in page after 3 seconds
	setTimeout(function () {
		window.location.replace("../index.html");
	}, 3000);
}
