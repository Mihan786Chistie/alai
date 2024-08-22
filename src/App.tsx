import TldrawComponent from './TldrawComponent';
import NavBar from './components/Navbar';
import Sidebar from "./components/Sidebar";
import "./draw.css";
import { useState } from "react";

const App = () => {
  const [responseData, setResponseData] = useState<{ heading: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (sentences: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.141.202:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentences.split("\n")),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='container'>
      <NavBar/>
      <TldrawComponent responseData={responseData} loading={loading}/>
      <Sidebar onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default App;