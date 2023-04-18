import React, { useState, useEffect } from "react";
import './App.css';
import Home from './components/pages/home/Home';
import Layout from './components/layout/Layout';
import DateRangePicker from './components/ui/daterangepicker/DateRangePicker';
import { IconContextProvider } from './context/icon-context';
import AutoComplete from './components/ui/autocomplete/AutoComplete';
function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  console.log({ message })

  return (
    <Layout>
      <div className="App">
        <Home />
      </div>
    </Layout>
  );
}

export default App;

