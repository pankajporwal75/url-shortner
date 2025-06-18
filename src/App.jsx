import React from "react";
import Navbar from "./components/Navbar";
import URLForm from "./components/URLForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">
        <URLForm />
      </main>
    </div>
  );
};

export default App;
