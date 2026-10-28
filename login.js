const loginForm = document.getElementById("loginForm");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");


// 👁️ Show / Hide Password
if (togglePassword) {
    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }

    });
}


// 🔐 Login
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (email === "" || password === "") {
            alert("Please enter email and password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }


        // 🌐 Django Login API
        fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log("Django response:", data);

            if (data.success) {
                alert(data.message);
                window.location.href = "index.html";
            } else {
                alert(data.message);
            }

        })
        .catch(function (error) {

            console.error("Login error:", error);
            alert("Server se connection nahi ho pa raha.");

        });

    });
}