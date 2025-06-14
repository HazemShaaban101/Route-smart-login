document.querySelector("h1").innerHTML +=
	" " + JSON.parse(localStorage.getItem("verifiedUser")).name;

document.getElementById("logout-btn").addEventListener("click", function () {
	localStorage.removeItem("verifiedUser");
	window.location.replace("../index.html");
});
