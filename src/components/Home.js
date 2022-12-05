import  {React, useEffect, useState } from 'react';
import Header from './Header';
import "./style.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import { setBagState } from '../context/bagSlice';
import api from './Api';

function Home () {
  const [data, setData] = useState("");
  const [dataName, setDataName] = useState("");
  const [productValue, setValue] = useState("");
  const [newDataName, setNewDataName] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const bagState = useAppSelector((state) => state.bag);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  
  useEffect(() => {
    fetchDatabyName()
  

}, [typeValue])
const fetchDatabyName = async () => {
  const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
   
  });
  setDataName(resp)
  return resp
}
const handleSubmit = (value) => {
  
  console.log(value)
  console.log(newDataName[0])
  
  console.log("POST" + newDataName[0], typeValue)
  console.log("BAG AND TYPE" + newDataName[0], typeValue)
  
  
  api.postNewBag({name: newDataName[0], bagtype: typeValue}
    
    ).then((res) => {
     console.log(res)
    });
  
}

    
const fetchData = async(value) => {
  //value has the format of "disa,handbag"
  //we need to split it into two variables, name and type
  const [name, type] = value.split(",");
  const resp = await axios.get("https://bycloudberry-server.onrender.com/getbag", {
    params: {
      name: name,
      type: type,
    },
    
  })
  setData(resp)
  dispatch(setBagState(resp.data));
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
  setInputValues({ ...e.target.value, ...abc });
  console.log(inputValues)
};
  

const handleInput= (e) => {
  if(e.key === 'Enter'){
    console.log(inputValues[0])
    setNewDataName(inputValues)
    api.postNewBag({
      name: inputValues[0],
      bagtype: typeValue
    })
    
    console.log("ny väska")

    

  }
}
const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(true);
    }

const routeToForm = () => {
  navigate("/form")
}


  return (
    <>
    < Header/>
    <div id="hero-image">
      <h3 id="header-products" style={{ fontSize: "20px" }}></h3>
        <select id="dropdown"style={{ textAlign:'center'}}   onChange={e=> { routeToForm(); fetchData(e.target.value); }} >
        <option  value="" style={{ textAlign:'center', padding:'30px' }} disabled selected>Select a product</option>
        {drpdown()}
        
        <option value={[inputValues, typeValue]}>{inputValues[0]} {typeValue}</option>;
          
        
      
        
        
        
        
        
        </select>
                    
        <div id="add">
        <button style={{display: isActive ? 'none': 'inline-block'}} onClick={(e) => {handle(); toggleClass()}}>Add product</button>
        <h3 style={{display: isActive? 'inline-block': 'none'}}>Submit new product by pressing enter</h3>

        <select value ={typeValue} onChange = {e => {setTypeValue(e.target.value)}}style={{display: isActive? 'inline-block': 'none'}} >
        <option  value="" style={{ textAlign:'center', padding:'30px' }} disabled selected>Select a type</option>
          <option>handbag</option>
          <option>crossbody</option>
          <option>clutch</option>
          <option>laptopbag</option>
          <option>laptopcover</option>
          <option>wallet</option>
        </select>
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <input id='addProduct'
              onChange={handleOnChange}
              key={c}
              onKeyPress={handleInput}
              className={index}
              type="text"
              maxLength={25}
              placeholder="Maximum characters is 25"
            ></input>
          );
        })}
       
        </div>
    </div>
    </>
  )
}

export default Home;