import { useState, Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Register from './components/Register';
import './App.css'

const Header = lazy(() => import('./components/Header'));
const Main = lazy(() => import('./components/Main'));
const Login = lazy(() => import('./components/Login'));
import { ThemeProvider } from './components/ThemeProvider';

const MainRoute = ({ setActiveBoard, activeBoard }) => {
  if (!localStorage.getItem("user_id")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* <Sidebar setActiveBoard={setActiveBoard} /> */}
      <Main activeBoard={activeBoard} />
    </>
  );
};

function App() {
  const [activeBoard, setActiveBoard] = useState(null);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user_id"));

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setIsLogin(false);
  };

  return (
    <>
      <ThemeProvider>
        {isLogin && <Header onLogout={handleLogout} />}

        <div className="content">
          <BrowserRouter>
            <Suspense fallback={<div className="loader-container"><div className="loader"></div></div>}>
              <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/main"
                  element={
                    isLogin
                      ? <MainRoute setActiveBoard={setActiveBoard} activeBoard={activeBoard} />
                      : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to={localStorage.getItem("user_id") ? "/main" : "/login"} replace />}
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;