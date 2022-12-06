import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';

import api from './Api';
import Header from './Header';
import {useNavigate} from 'react-router-dom';


import { useAppDispatch, useAppSelector } from '../context/hooks';
import { setBagState } from '../context/bagSlice';



const FormUI = () => {
    const navigate = useNavigate()
    const url = "https://bycloudberry-server.onrender.com/getbag";
    const postURL = "https://bycloudberry-server.onrender.com/insertbag"
    const [data, setData] = useState("");
    const [dataName, setDataName] = useState("");
    const [productValue, setValue] = useState("");
    const [bag, setBag] = useState();
    const [newBag, setNewBag] = useState("");

    const bagState = useAppSelector((state) => state.bag);
    const dispatch = useAppDispatch();

    
    const inputRef = useRef([]);
    const colorRef = useRef([]);
    const comparisonInput = useRef([]);
    
    useEffect(() => {
        fetchDatabyName()
        

    }, [])

    
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
    
    const fetchDatabyName = async () => {
        const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
         
        });
        setDataName(resp)
        return resp
    }
    useEffect(() => {
        const inputLeather = inputRef.current[0];
        const inputProduction = inputRef.current[1];
        const inputLogistics = inputRef.current[2];
        const inputRecycling = inputRef.current[3];
        const inputLining = inputRef.current[4];
        const inputPackaging = inputRef.current[5];
        const inputDetails = inputRef.current[6];
        
        const colorLeather = colorRef.current[0];
        const colorProduction = colorRef.current[1];
        const colorLogistics = colorRef.current[2];
        const colorRecycling = colorRef.current[3];
        const colorLining = colorRef.current[4];
        const colorPackaging = colorRef.current[5];
        const colorDetails = colorRef.current[6];

       
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        api.updateBag({name : bag.name, bagtype: bag.type, graphdata: [
            { type: "Leather", amount: parseInt(inputRef.current[0].value), color: colorRef.current[0].value},
            { type: "Production", amount: parseInt(inputRef.current[1].value), color: colorRef.current[1].value },
            { type: "Logistics", amount: parseInt(inputRef.current[2].value), color: colorRef.current[2].value },
            { type: "Recycling", amount: parseInt(inputRef.current[3].value), color: colorRef.current[3].value},
            { type: "Lining", amount: parseInt(inputRef.current[4].value), color: colorRef.current[4].value },
            { type: "Packaging", amount: parseInt(inputRef.current[5].value), color: colorRef.current[5].value},
            { type: "Details", amount: parseInt(inputRef.current[6].value), color: colorRef.current[6].value },
            
          ]}).then((res) => {
           
          });
        }
        
    const handleChange = () => {
        setData(data)
        
        


    }
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(true);
    }
    

    
    


    function renderData() {
            var renderData = bagState ? bagState.graphdata.map((item, index) => {
        
                return (
                    
                   <>
                    <div className='field'>
                    <label key={index} >
                     {item.type} (kg CO2E) 
                     <br></br>
                    <input type="number" step="0.001" min="0.001"  ref={(ref) => (inputRef.current[index] = ref)} key ={item.amount} defaultValue={item.amount} placeholder={item.amount} value={item.value}>
                    </input>
                    
                    </label>
                    </div>
                    <div className='field'>
                    <label key={index}>
                    {item.type} (Hex color)
                    <br></br>
                    <input ref={(ref) => (colorRef.current[index] = ref)} key={item.color} defaultValue={item.color}placeholder={item.color} value={item.value}></input>
                    </label>
                   
                    </div>
                   
                    </>

                )

            }): "";

        return renderData;
        
    }
/*
    function checkHexValues () {
        let hexValue = "/^3\d{9}$/";

        if (colorRef.match(hexValue)) {
            alert("Success!")

            return true;    

        }

        else {
            alert("Failed!")

            return false; 

        }



    }
  

   */
   
    

    
    function ComparisonData() {
        
        var comparisonData = bagState? bagState.comparisonData:""

        return (
            <div style={{display: isActive ? 'none': 'block'}}className= "compfield">
            
            <label>
                Comparison Data
                <br></br>
               <input type="number" step="0.001" min="0.001" ref={comparisonInput} defaultValue={comparisonData}>        
               </input>
            </label>
            </div>

        )

    }
   

    
    // useEffect(() => {
    //     storeBags()
        
        
        
        

    // }, [])

    function setCurrentBag(value) {
       //value has the format of "disa,bagtype"
       // we need to split it into two variables name and type in that order
         var name = value.split(",")[0]
        var type = value.split(",")[1]
        const bag = {name: name, type: type};
        setBag(bag);
        
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

   const routeToHome = () => {
    navigate("/")
  }
   
    return (
       <>
         < Header/>
        <form  class="form" onSubmit={handleSubmit}>
            
            <div id="hero-image">
                <div id="hero-text">
                <h1 id="header" style={{ fontSize: "50px" }}>GRAPH DATA FORM</h1>
                     
                </div>
             </div>
                
                <h3 id="header-products" style={{ fontSize: "20px" }}>Products</h3>
                
                    <select id="dropdown"style={{ textAlign:'center'}} value={productValue}  onChange={e=> {fetchData(e.target.value);setValue(e.target.value); setCurrentBag(e.target.value); handleChange();toggleClass(e.target.value) }} >
                    <option  value="" style={{ textAlign:'center', padding:'30px' }} disabled selected>Select a product</option>
                    {drpdown()}
                    
                    </select>
                    <h1>{bagState.name}</h1>
                    
                    
            {renderData()}
            {ComparisonData()}
            <button onClick={routeToHome} style={{display: isActive ? 'none': 'inline-block'}}id="back-button">Back</button>
            <button style={{display: isActive ? 'none': 'inline-block'}}id="save-button" value='submit'>Save and Continue</button>
            <div className='colorPicker'>
            <ColorPicker></ColorPicker>
            </div>

            </form>

            </>
    )
}

export default FormUI;