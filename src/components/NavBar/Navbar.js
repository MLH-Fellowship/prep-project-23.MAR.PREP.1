
import "./NavBar.css"
import logo from "../../mlh-prep.png";
import racoon from "./Marvel-Rocket-Raccoon-PNG-Pic-2160382602.png"
import SavedPlaces from "../Autocomplete/SavedPlaces";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";


const NavBar = ({showNews, setShowNews, display, setUpdateIcon}) =>{
    const [isOpen, setIsOpen] = useState(true);
    const [toggle, setToggle] = useState(false)
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    useEffect(() =>{
        const handleResize = () => {
            // setScreenWidth(window.innerWidth);
            if (window.innerWidth > 940) {
                setIsOpen(true);
                setToggle(false);
            } else {
                setToggle(true);
            }
        };
    
        window.addEventListener("resize", handleResize);   
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return(
    <div className="nav">
        <a href="/"><img className="racoon" width="100px" src={racoon} alt="Reactive Racoon"></img></a>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        {!toggle  && 
            <div className="space-buttons">
            <SavedPlaces className="button" display={display} setUpdateIcon={setUpdateIcon} />
            <button
            className="button"
            onClick={() => setShowNews(!showNews)}
            style={{
                display: "inline-block",
                borderRadius: "4px",
                backgroundColor: "black",
                border: "none",
                color: "white",
                textAlign: "center",
                fontSize: "1rem",
                padding: "15px",
                width: "clam(6%,10px,20%)",
                transition: "all 0.5s",
                cursor: "pointer",       
                }}
            >
            {!showNews ? "Top Headlines" : "Hide Headlines"}
            </button>
            </div>
        }
        {!isOpen && <div className="dropdown" style={{display:'block'}}>
        <ul className="nav-buttons">
            <SavedPlaces className="button" display={display} setUpdateIcon={setUpdateIcon} />
            <button
            className="button"
            onClick={() => setShowNews(!showNews)}
            style={{
                display: "inline-block",
                borderRadius: "4px",
                backgroundColor: "black",
                border: "none",
                color: "white",
                textAlign: "center",
                fontSize: "1rem",
                padding: "15px",
                width: "clam(6%,10px,20%)",
                transition: "all 0.5s",
                cursor: "pointer",       
                }}
            >
            {!showNews ? "Top Headlines" : "Hide Headlines"}
            </button>
        </ul>
        </div>}

        {toggle && <Hamburger onToggle={() => toggleDropdown()} />}
    </div>
    )
}

export default NavBar;
