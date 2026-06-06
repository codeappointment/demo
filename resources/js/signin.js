import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();
const button = document.getElementById('login-btn');

// Function to handle Google Sign-In
export function signInWithGoogle() {


    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user.email)
            console.log(auth.currentUser.displayName)


            fetch('/login', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: user.email
            })
                .then(response => {
                    if (response.ok) {
                        // Redirect to user page if login is successful
                        window.location.href = "{{ route('prescription') }}";
                    } else {
                        alert('Sign in failed. Please check your credentials.');
                    }
                })
                .catch(error => console.error('Error:', error));
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
// export const signin = signInWithGoogle();
// Add an event listener to your Google Sign-In button
if (button)
    button.addEventListener('click', () => {
        const loginButton = document.getElementById('login-btn');
        signInWithGoogle();
    });


