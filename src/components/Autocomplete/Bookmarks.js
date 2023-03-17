import { Bookmark, BookmarkBorderOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";



const Bookmarks = ({results, updateIcon}) =>{
    const [fillbookmark, setFillbookmark] = useState(false)

    // updateIcon is updating when Clear Bookmarks button is clicked inside the modal
    // the goal is for the bookmark icon to be outlined since it is no longer in the localStorage
    useEffect(() =>{
        setFillbookmark(prevFillbookmark => !prevFillbookmark)
    }, [updateIcon])

    useEffect(() =>{
        // first set Fillbookmark to false and then find out if the city is in the localStorage
        setFillbookmark(false)
        const getArrayCities = localStorage.getItem("cities")
        let addCitiesInArray = JSON.parse(getArrayCities)
        for( let i in addCitiesInArray){
            if (addCitiesInArray[i].name === results.name){
                setFillbookmark(true)
                
            }
        }
    }, [results])
    
    const addInfoHandler = (results) =>{
        // change the icon to full
        setFillbookmark(prevFillbookmark => !prevFillbookmark)
        // getting access to the local storage and adding the current city to the array
        const getArrayCities = localStorage.getItem("cities")
        let addCitiesInArray = []
        if(getArrayCities){
            addCitiesInArray = JSON.parse(getArrayCities)
        }
        const addCity = {name: results.name}
        addCitiesInArray.push(addCity)
        localStorage.setItem("cities", JSON.stringify(addCitiesInArray))
    }

    const removeInfoHandler = (results) =>{
        // set icon to outlined
        setFillbookmark(prevFillbookmark => !prevFillbookmark)
        // getting access to the local storage and filter through to find the city.name and remove it
        const getArrayCities = localStorage.getItem("cities")
        let addCitiesInArray = JSON.parse(getArrayCities)
        const newArray = addCitiesInArray.filter((city) =>{
            return city.name !== results.name
        })
        localStorage.setItem("cities", JSON.stringify(newArray))
        
        
    }
    return(
        
            fillbookmark ?
            <Bookmark style={{width : "50px", height : "50px" }} onClick={() => removeInfoHandler(results)}/>            
            :
            <BookmarkBorderOutlined style={{width : "50px", height : "50px" }} onClick={() => addInfoHandler(results)}/>    
    )
}




export default Bookmarks