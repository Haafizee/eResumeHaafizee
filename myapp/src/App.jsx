import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeWeb from "./pages/eResume.jsx";
import KemaskiniResume from "./pages/KemaskiniResume.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResumeWeb />} />
          <Route path="/kemaskini" element={<KemaskiniResume />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}
