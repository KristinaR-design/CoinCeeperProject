import React, { useState, useRef, useEffect } from "react";
import '../css/Header.css';
import '../css/Theme.css'
import { useTheme } from "./ThemeProvider";

const Header = () => {
    const { isDarkMod, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Закрытие меню при клике вне его области
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function logOut() {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        window.location.href = "/login";
    }

    return (
        <div className="header">
            <div className="text">CoinKeeper</div>

            <div className="user-menu-container" ref={menuRef}>
                <div 
                    className="user-text-button" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {localStorage.getItem("user_name")}
                </div>

                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <div className="menu-buttons">
                            <button className="theme-toggle" onClick={() => {
                                toggleTheme();
                                setIsMenuOpen(false);
                            }}>
                                {isDarkMod ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            </button>
                            <button onClick={logOut} className="LogOut">
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;