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
  const [newDataName, setNewDataName] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [inputValues, setInputValues] = useState("");
  const [counter, setCounter] = useState(0);

  const bagState = useAppSelector((state) => state.bag);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  
  useEffect(() => {
    fetchDatabyName()
  

  }, [typeValue])
  //fetches the product names from the db and stores the respone in the state
  const fetchDatabyName = async () => {
    const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
    
    });
    setDataName(resp)
    return resp
  }

  const fetchData = async(value) => {
    //fetches the data within each product from the db and stores it in the state

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
    /*
    loops over the items in the array from the fetch and return them in the 
    option element to be displayed. The values displayed is bag name and type
    */
    var renderData = dataName ? dataName.data.map((item) => {
    const all_products = item.name
    const type = item.type

    
    return (
        <option  value= {[all_products, type]}> {all_products} {type}</option>
        
    )
    
  }): "";

  return renderData;

  }


  const handle = () => {
    /* function that handles the dynamic input fields when 
    selecting to add a new bag
    */
    setCounter(counter +1)
    
  }
  const handleOnChange = (e) => {
    // storing the user input in the useState
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...e.target.value, ...abc });
    console.log(inputValues)
  };

  const handleInput= (e) => { 
    /*
    function that checks if the newly added product already exist in the db.
    If it exist give the user an alert and stop the form from being sent.
    If not in db, post the product to the db. 
    */
    const i = dataName.data.some((item) => {
    if(item.name.includes(inputValues[0])) {
      alert(`The name ${inputValues[0]} already exist. Pick another name`)
      
    }
    })
        
    setNewDataName(inputValues)
    api.postNewBag({
    name: inputValues[0],
    bagtype: typeValue
  })
  }

  const [isActive, setActive] = useState(false);
    // useState and function that displays/hides certain elements
    const toggleClass = () => {
      setActive(true);
    }

  const routeToForm = () => {
    navigate("/form")
  }

    /*
    returns the all the code that is displayed on the website. 
    */
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
                    className={index}
                    type="text"
                    maxLength={25}
                    placeholder="Maximum characters is 25">
                  </input>
                );
              })}
              <button id="addProductBtn"style={{display: isActive? 'block': 'none'}} 
              onClick={e =>{toggleClass(); handleInput()}}>Add product</button>
            </div>
        </div>
    
    </>
  )
}

export default Home;