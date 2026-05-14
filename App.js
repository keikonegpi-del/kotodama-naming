import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Questionnaire from './Questionnaire';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
}
