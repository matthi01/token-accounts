import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./styles/styles.scss"

const App: React.FC = () => {
  return (
    <div className="app">
      <Header
        includeBanner
        bannerTitle="Account Dashboard"
        bannerSubText="Ledn Token"
      />
      <main className="width-control">
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
