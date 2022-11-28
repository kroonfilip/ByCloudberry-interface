import  {React, useEffect, useState } from 'react';
import Header from './Header';
import "./style.css";
import axios from "axios";

function Home () {
  const [dataName, setDataName] = useState("");
  const [productValue, setValue] = useState("");
  const [newDataName, setNewDataName] = useState("");
  useEffect(() => {
    fetchDatabyName()
  

}, [])
const fetchDatabyName = async () => {
  const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
   
  });
  setDataName(resp)
  return resp
}
function drpdown() {

  var renderData = dataName ? dataName.data.map((item) => {
  const all_products = item.name
  const type = item.type

  
  return (
      <option  value= {[all_products, type]}> {all_products} {type}</option>
      
  )
  
}): "";

return renderData;

}
const [inputValues, setInputValues] = useState("");
const [counter, setCounter] = useState(0);
const handle = () => {
  setCounter(counter +1)
  
}
const handleOnChange = (e) => {
  const abc = {};
  abc[e.target.className] = e.target.value;
  setInputValues({ ...inputValues, ...abc });
  console.log(inputValues)
};
  

const handleInput= (e) => {
  if(e.key == 'Enter'){
    setNewDataName(inputValues)
    console.log(inputValues)

  }
}
const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(true);
    }

  return (
    <>
    < Header/>
    <div id="hero-image">
      <h3 id="header-products" style={{ fontSize: "20px" }}></h3>
        <select id="dropdown"style={{ textAlign:'center'}} value={productValue}  onChange={e=> {setValue(e.target.value); }} >
        <option  value="" style={{ textAlign:'center', padding:'30px' }} disabled selected>Select a product</option>
        {drpdown()}
        {Object.keys(newDataName).map((c) => {
          return <option>{newDataName[c]}</option>;
        })}
        
        
        
        
        </select>
                    
        <div id="add">
        <button style={{display: isActive ? 'none': 'inline-block'}} onClick={(e) => {handle(); toggleClass()}}>Add product</button>
        <h3 style={{display: isActive? 'inline-block': 'none'}}>Submit new product by pressing enter</h3>


        {Array.from(Array(counter)).map((c, index) => {
          return (
            <input
              onChange={handleOnChange}
              key={c}
              onKeyPress={handleInput}
              className={index}
              type="text"
            ></input>
          );
        })}
        </div>
    </div>
    </>
  )
}

export default Home;