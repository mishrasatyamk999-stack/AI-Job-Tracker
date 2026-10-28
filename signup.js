const signupForm = document.getElementById("signupForm");

const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const toggleSignupPassword =
    document.getElementById("toggleSignupPassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


// ===============================
// PASSWORD SHOW / HIDE
// ===============================

if (toggleSignupPassword) {
    toggleSignupPassword.addEventListener("click", function () {

        if (signupPassword.type === "password") {

            signupPassword.type = "text";

            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");

        } else {

            signupPassword.type = "password";

            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }

    });
}


if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener("click", function () {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");

        } else {

            confirmPassword.type = "password";

            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }

    });
}


// ===============================
// SIGNUP FORM
// ===============================

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get values from form

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            signupPassword.value.trim();

        const confirm =
            confirmPassword.value.trim();

        const terms =
            document.getElementById("termsCheckbox").checked;


        // ===============================
        // VALIDATION
        // ===============================

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirm === ""
        ) {

            alert("Please fill all fields.");

            return;
        }


        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;
        }


        if (password !== confirm) {

            alert("Passwords do not match.");

            return;
        }


        if (!terms) {

            alert("Please accept Terms & Conditions.");

            return;
        }


        // ===============================
        // SEND DATA TO Django
        // ===============================

        fetch("http://127.0.0.1:8000/signup/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                email: email,

                password: password

            })

        })


        // ===============================
        // FLASK RESPONSE
        // ===============================

        .then(function (response) {

            return response.json();

        })


        .then(function (data) {

            console.log("Flask response:", data);


            if (data.success) {

                alert(data.message);

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        })


        // ===============================
        // ERROR
        // ===============================

        .catch(function (error) {

            console.error("Error:", error);

            alert(
                "Server se connection nahi ho pa raha."
            );

        });

    });

}