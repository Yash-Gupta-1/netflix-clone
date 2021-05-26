import React, { useEffect, useState } from 'react'
import './Navbar.css';

function Navbar() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        });

        return () => {
            window.removeEventListener("scroll");
        };

    }, [])

    return (
        <div className={`Navbar ${show && "Navbar__black"}`}>
            <img
                className="Netflix__logo"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix"
            />
            <img
                className="Netflix__avataar"
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="Netflix__logo"
            />
        </div>
    )
}

export default Navbar;
