<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Card</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <dialog class="login-container" id="loginContainer">
        <div class="tab-container">
            <button class="tab active" id="signinTab">Login</button>
            <button class="tab" id="signupTab">Sign Up</button>
        </div>

        <div class="form-body">
            <h2 id="headerText">Login</h2>

            <div>
                <form>
                    <input type="email" placeholder="your_email@gmail.com" required id="emailInput">
                    <input type="password" placeholder="password" required id="passInput">
                    <input type="password" placeholder="Confirm password" required id="passConfirmInput"
                        style="visibility: hidden">
                    <div id="passAlert" class="passAlert" style="visibility: hidden"> Password must be same!</div>
                    <div class="forgotPass" id="forgotPass">Forgot password?</div>
                </form>
                <button class="btn-primary" id="submitBtn">
                    <span class="spinner" id="spinner"></span>
                    <span class="btn-text" id="btnText">Sign In</span>
                </button>
            </div>

            <div class="divider" id="dividerLogin"><br> For mobile and personal desktop</div>

            <button class="btn-google" id="googleSigninBtn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google Logo">
                Sign in with Google
            </button>
            <button class="closeModal" id="closeModalBtn">Close</button>
        </div>
    </dialog>

</body>

</html>
