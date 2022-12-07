import axios from "axios";
const postURL = "https://bycloudberry-server.onrender.com/insertbag"
const putURL = "https://bycloudberry-server.onrender.com/updatebag"
export async function postNewBag(bag) { 
    console.log("TEST")   
    const resp = await axios.post(postURL, bag).catch((err) => {        
         console.log(err);     });     console.log(resp);     
         return resp ? resp.data : [{}]; }
    
    
    
   
export async function updateBag(bag) {
    const response = await axios.put(putURL, bag);
    return response;
}
const api = {
    postNewBag,
    updateBag
}
export default api