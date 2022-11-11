import axios from "axios";
const postURL = "https://bycloudberry-server.onrender.com/updatebag"
export async function postNewBag(bag) {     
    const resp = await axios.put(postURL, bag).catch((err) => {        
         console.log(err);     });     console.log(resp);     
         return resp ? resp.data : [{}]; }
    
    const api = {
        postNewBag
    }
   
export async function updateBag(bag) {
    const response = await axios.put(postURL, bag);
    return response;
}
export default updateBag