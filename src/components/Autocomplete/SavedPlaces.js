import { useEffect, useState } from "react";
import SavedPlaceCard from "./SavedPlaceCard";
import Modal from "react-modal";


const SavedPlaces = ({display}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [cities, setCities] = useState([]);
    
    // once clicked it will display the modal
    const openModal = () => {
        setIsOpen(true)
        display(true)

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
      },
  };



  const handleRemove = () =>{
    localStorage.clear()
    // setDeleteBookmark(prevDeleteBookmark => !prevDeleteBookmark)
  }
  useEffect(() => {
    const getArrayCities = localStorage.getItem("cities");
    if (getArrayCities) {
      const addCitiesInArray = JSON.parse(getArrayCities);
      setCities(addCitiesInArray);
    }
  }, []);

  return (
    <>
      <button onClick={openModal} style={{
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "white",
        border: "none",
        color: "black",
        textAlign: "center",
        fontSize: "1rem",
        padding: "15px",
        width: "clam(6%,10px,20%)",
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
        
        <button style={{
        background: "none",
        border: "none",
        textDecoration: "underline",
        color: "#000",
        cursor: "pointer"}}
        onClick={() => handleRemove()}>Clear Bookmarks</button>        
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
