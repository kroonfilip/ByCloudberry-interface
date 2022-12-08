import axios from "axios";
const postURL = "https://bycloudberry-server.onrender.com/insertbag"
const putURL = "https://bycloudberry-server.onrender.com/updatebag"
const deleteURL = "https://bycloudberry-server.onrender.com/deletebag"

export async function postNewBag(bag) { 
     
    const resp = await axios.post(postURL, bag).catch((err) => {        
         console.log(err);     });     console.log(resp);     
         return resp ? resp.data : [{}]; 

}
   
export async function updateBag(bag) {
    
    const resp = await axios.put(putURL, bag).catch((err) => {
        console.log(err);   });   console.log(resp);
        return resp ? resp.data : [{}];
}

export async function deleteBag(bag){
    const resp = await axios.delete(deleteURL, bag).catch((err) => {
        console.log(err);
    });
    console.log(resp);
    return resp ? resp.data : [{}];
}

const api = {
    postNewBag,
    updateBag,
    deleteBag
}

export default api