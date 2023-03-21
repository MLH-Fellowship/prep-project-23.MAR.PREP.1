import { useEffect, useState } from "react";
import SavedPlaceCard from "./SavedPlaceCard";
import Modal from "react-modal";


const SavedPlaces = ({display, newLocationSaved}) => {
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
          width: '60vw',
          height:'60vh',
          zIndex:"999",
          color:"black",
      },
  };

  const buttonStyles ={
    
    " color":'pink',
    
  }


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
      <button onClick={openModal} style={buttonStyles} >Saved Locations</button>
      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="View bookmarked cities"
      
      >
          {cities.map((city) => (
            <SavedPlaceCard key={city.name} city={city} />
          ))}
          <button onClick={() => handleRemove()}>clear Bookmarks</button>        
      </Modal>
    </>
  );    
};

export default SavedPlaces;
