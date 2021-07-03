import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./Dashboard";
import "./styles/styles.scss"

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
