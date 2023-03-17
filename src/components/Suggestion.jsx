import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Lottie from "lottie-react";
import drink from './ifoods/drink.json'
import icecream from './ifoods/icecream.json'
import watermelon from './ifoods/watermelon.json'
import caps from './items/cap.json'
import glasses from './items/glasses.json'
import fan from './items/fan.json'
import itemArray from './items';
import { Typography } from '@mui/material';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Suggestion({weatherType,isLoaded}) {
  const arr = [];
  const API_KEY = '71b52e36f8fd3004c954ae4904da8749';

//   let lat=21.4888;
//   let lon=83.8844;
//   var city='burla'
//   axios({
//     method: "get",
//     url: `https://api.openweathermap.org/data/2.5/weather?q=burla&appid=71b52e36f8fd3004c954ae4904da8749`
//   }).then((forecast)=>forecast.json()
// ).then((data)=>{  
   
//     let x = JSON.stringify(data)
//     console.log("this is it "+x );
//   });


const itemPopulate = ()=>{

  if(weatherType==='Clouds')
  {
    itemArray.rainy.forEach((item)=>{
      console.log("ok");
      console.log([item]);
      arr.push(caps)
    })
  }

  
  console.log(arr)
}
itemPopulate()

    const openAmazonStore = (item)=>{
        window.open(`www.amazon.in/s?k=${item}`, '_blank', 'noreferrer');
    }


  return (
    <div className='suggestion'>

<Box 
className="items-required"
          border={2}
          marginTop='7rem'
         >
      <Grid
      gap={'80px'}
       sx={[{ flexGrow: 1 }
        ,{justifyContent:'center'}
        ,{alignItems:'center'}]}
       container spacing={2}>

        {
          isLoaded &&
          // eslint-disable-next-line array-callback-return
          arr.map((item)=>{

            <Grid 
            className='item-box'
            item >

         
         <Lottie animationData={caps} loop={true} />
         <div onClick={openAmazonStore}>
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         </div>
         
         

        </Grid>
        })
        }
         
          
        {/* <Grid
        className='item-box'
         item >
         <Lottie animationData={glasses} loop={true} />
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         
        </Grid>
        <Grid 
        className='item-box'
        item >
         <Lottie animationData={fan} loop={true} />
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         
        </Grid>
      */}

      </Grid>
    </Box>


          <Box 
          className="foods"
          border={2}
          marginTop='7rem'
         >
      <Grid
      gap={'80px'}
       sx={[{ flexGrow: 1 }
        ,{justifyContent:'center'}
        ,{alignItems:'center'}]}
       container spacing={2}>

        <div 
        // initial={{ opacity: 0.6 }}
        // whileHover={{
        //   scale: 1.2,
        //   transition: { duration: 1 },
        // }}
        >
        <Grid 
        className='item-box'
        item >

         
         <Lottie animationData={drink} loop={true} />
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         

        </Grid>
          </div>
          
        <Grid
        className='item-box'
         item >
         <Lottie animationData={icecream} loop={true} />
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         
        </Grid>
        <Grid 
        className='item-box'
        item >
         <Lottie animationData={watermelon} loop={true} />
         <ShoppingBagIcon className='bag' sx={[{position:'relative'},{color:'#000'}]}></ShoppingBagIcon>
         
        </Grid>
     

      </Grid>
    </Box>
    </div>
  )
}
