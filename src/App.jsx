import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import { DarkModeProvider } from './context/DarkModeContext';
import SignIn from './pages/SignIn';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
