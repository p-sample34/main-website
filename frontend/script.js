let isLoginMode = true;

function toggleLogin() {
    const modal = document.getElementById("loginModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleFormMode() {
    isLoginMode = !isLoginMode;

    document.getElementById("formTitle").textContent = isLoginMode ? "Login" : "Register";
    document.querySelector(".login-box button").textContent = isLoginMode ? "Login" : "Register";
    document.getElementById("toggleText").textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";
    document.getElementById("toggleLink").textContent = isLoginMode ? "Register here" : "Login here";
    document.getElementById("loginMessage").textContent = "";
}

async function submitForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    const endpoint = isLoginMode ? "/login" : "/register";

    try {
        const res = await fetch(`https://main-website-uftu.onrender.com${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        message.textContent = data.message;
        message.style.color = res.ok ? "green" : "red";

        if (isLoginMode && res.ok) {
            alert("Welcome " + username);
            toggleLogin();

            // Show profile icon after login
            const loginBtn = document.querySelector(".login-btn");
            loginBtn.innerHTML = `<img src="profile.png" alt="Profile" class="profile-pic">`;
            loginBtn.style.background = "transparent";
            loginBtn.style.padding = "0";
            loginBtn.style.borderRadius = "50%";
        }
    } catch (err) {
        console.error("Error:", err);
        message.textContent = "Something went wrong!";
        message.style.color = "red";
    }
}

function openMap() {
    const latitude = 19.468190394468106;
    const longitude = 82.80674060034208;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
}
