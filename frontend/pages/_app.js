// pages/_app.js
import "../styles/globals.css";
import "../styles/Form.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ...existing code...
import { useContext } from "react";
// ...existing code...
import { UserProvider } from "../components/UserContext";
// ...existing code...
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default MyApp;
