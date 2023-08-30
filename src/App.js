import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Router from './Router/Router'

function App() {
  const clientId = "999951030063-e0jfqenvt4fb0c821gg60mfrgvigd3pe.apps.googleusercontent.com"
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Router></Router>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
