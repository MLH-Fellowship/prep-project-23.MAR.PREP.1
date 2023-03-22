import { useEffect, useState } from "react";
import SavedPlaceCard from "./SavedPlaceCard";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const SavedPlaces = ({display, setUpdateIcon}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    // cities useState is being used to store the bookmarked cities from the localStorage
    const [cities, setCities] = useState([]);
    const [loadStorage, setLoadStorage] = useState(false)
    


    // once clicked it will display the modal
    const openModal = () => {
        setIsOpen(true)
        display(true)
        setLoadStorage(prevloadStorage => !prevloadStorage)
    }

    // if clicked the modal will be closed 
    const closeModal = () => {
        setIsOpen(false);
        setConfirmed(false);
        display(false)
        
    }

    // this is how the control the display of the modal
    const customStyles = {
      content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',

          width: 'clamp(60vw,300px, 90% )',
          height:'min(60vh, 600px)',
          borderRadius: '20px',
          color:"black",
          zIndex: "99"
          
      },
  };


  // this will clear the localStorage and make sure cities useState is empty
  const handleRemove = () =>{
    localStorage.clear()
    setLoadStorage(prevloadStorage => !prevloadStorage)
    setCities([])
    closeModal()
    setUpdateIcon(prevupdateIcon => !prevupdateIcon)
    
  }
  // if the localStorage is updating then this useEffect will update the cities useState 

  useEffect(() => {
    const getArrayCities = localStorage.getItem("cities");
    if (getArrayCities) {
      const addCitiesInArray = JSON.parse(getArrayCities);
      setCities(addCitiesInArray);
    }

  }, [loadStorage]);


  

  return (
    <>

      <button onClick={openModal} style={{
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "white",
        border: "none",
        color: "black",
        textAlign: "center",
        justifyContent: "center", 
        fontSize: "1rem",
        padding: "15px",
        width: "clam(6%,10px,20%)",
        height: "min(3%, 5px, 10%)",
        transition: "all 0.5s",
        cursor: "pointer",       
      }}>Saved Locations</button>

      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="View bookmarked cities"
      >          
        <h1>Saved Locations</h1>
        
        { cities.length > 0 &&
        <button style={{
        background: "none",
        border: "none",
        textDecoration: "underline",
        color: "#000",
        cursor: "pointer"}}
        onClick={() => { handleRemove(); toast.error("Saved locations were removed from local storage!"); }}>Clear Bookmarks</button>

        }       
        {
          cities.length === 0?
          <h2 style={{
            paddingTop:'15%'

          }}>No Saved Locations</h2>
          :
          cities.map((city) => (
          <SavedPlaceCard key={city.name} city={city} />
        ))
        }
      </Modal>
    </>
  );    
};

export default SavedPlaces;
