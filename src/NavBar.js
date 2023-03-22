import "./NavBar.css"
import logo from "./mlh-prep.png";
import racoon from "./Marvel-Rocket-Raccoon-PNG-Pic-2160382602.png"
import SavedPlaces from "./components/Autocomplete/SavedPlaces";


const NavBar = ({display, setUpdateIcon}) =>{
    
    return(
        <div className="nav">
            <a href="/"><img className="racoon" width="100px" src={racoon} alt="Reactive Racoon"></img></a>
            <img className="logo" src={logo} alt="MLH Prep Logo"></img>
            <SavedPlaces display={display}  setUpdateIcon={setUpdateIcon} />
        </div>
    )
}

export default NavBar