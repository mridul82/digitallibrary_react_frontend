import './App.css';
import Dashboard from './component/dashboard';
import ContentDetails from './component/ContentDetails';
import './pages/Login';
import Login from './pages/Login';

import { ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from "react-router-dom";

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Customize the primary color
    },
    secondary: {
      main: '#f50057', // Customize the secondary color
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
 <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content/:id" element={<ContentDetails />} />
      </Routes>
    </ThemeProvider>
     
  
  );
}

export default App;
