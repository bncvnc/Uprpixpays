
import {ACCEPT} from './actiontypes';


export const Accept = (val,id) => {
    return (dispatch,getState) => {
       fetch('https://urpixpays.com/stagging_urpixpays/accept', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             "uid":getState().user.user.no,
             "item": id,
             "val": val,
          }),
       })
          .then((response) => response.json())
          .then((responseData) => {
 
            if(responseData==='Success')
            {
                alert('Success')
            }
            else{
                alert('Something went wrong')
            }
            
          })
          .catch((err) => console.log(err))
          .done();
    }
 }



 export const SaveAccept=(val)=>
 {
     return{
        type:ACCEPT,
        val:val,
     }
    

 }