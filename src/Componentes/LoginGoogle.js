import { gapi } from "gapi-script";
import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId = "999951030063-e0jfqenvt4fb0c821gg60mfrgvigd3pe.apps.googleusercontent.com"; 

const handleGoogleLogin = async (response) => {
  try {
    console.log("LOGIN SUCCESS! Profile:", response.profileObj);

    // Faça a autenticação via gapi.auth2
    const authInstance = gapi.auth2.getAuthInstance();
    const googleUser = await authInstance.signIn();
    console.log("Google User:", googleUser);
  } catch (error) {
    console.error("LOGIN FAILED! Error:", error);
  }
};

function LoginGoogle() {
  return (
    <div id="singInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login With Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin} // Trate os erros de forma consistente
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;
