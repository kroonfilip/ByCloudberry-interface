import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';

import api from './Api';
import Header from './Header';
import {useNavigate} from 'react-router-dom';


import { useAppDispatch, useAppSelector } from '../context/hooks'
import iIcon from '../Image/240px-Infobox_info_icon.png'
import piechart1Background from '../Image/piechart1Background.png'
import piechart3Background from '../Image/piechart3Background.png'

import { editGraphData, setBagState, editComparisonData } from '../context/bagSlice';




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
    const [isHoveringFirstGraph, setIsHoveringFirstGraph] = useState(false);
    const [isHoveringSecondGraph, setIsHoveringSecondGraph] = useState(false);

    
    useEffect(() => {
        fetchDatabyName()
        

    }, [])


    const handleMouseOverFirst = () => {
        setIsHoveringFirstGraph(true);
    };
  
    const handleMouseOutFirst = () => {
        setIsHoveringFirstGraph(false);
    };

    const handleMouseOverSecond = () => {
        setIsHoveringSecondGraph(true);
    };
  
    const handleMouseOutSecond = () => {
        setIsHoveringSecondGraph(false);
    };

    
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
       const graphdata = [
            { type: "Leather", amount: parseInt(inputRef.current[0].value), color: colorRef.current[0].value},
            { type: "Production", amount: parseInt(inputRef.current[1].value), color: colorRef.current[1].value },
            { type: "Logistics", amount: parseInt(inputRef.current[2].value), color: colorRef.current[2].value },
            { type: "Recycling", amount: parseInt(inputRef.current[3].value), color: colorRef.current[3].value},
            { type: "Lining", amount: parseInt(inputRef.current[4].value), color: colorRef.current[4].value },
            { type: "Packaging", amount: parseInt(inputRef.current[5].value), color: colorRef.current[5].value},
            { type: "Details", amount: parseInt(inputRef.current[6].value), color: colorRef.current[6].value },
            
       ]
        api.updateBag({
            name: bagState.name,
            bagtype: bagState.bagtype,
            graphdata: graphdata,
            comparisonData: parseInt(comparisonInput.current.value),
        }).then((res) => {
            console.log(res)
        })
        dispatch(editGraphData(graphdata))
        dispatch(editComparisonData(comparisonInput.current.value))
        navigate("/transparency")

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
                    <label key={index}>
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

    

    
    function ComparisonData() {
        
        var comparisonData = bagState? bagState.comparisonData:""

        return (
            <div style={{display: isActive ? 'none': 'block'}}className= "compfield">
            
            <label>
                Comparison Data
                <img onMouseOver={handleMouseOverSecond} onMouseOut={handleMouseOutSecond} src={iIcon} width={15} height={15}></img>

                   <br></br>
                       {isHoveringSecondGraph && (
                           <div>
                               <img id='b' src={piechart3Background} alt='img' width={470} height={350}></img>

                           </div>
                       )}


               <input type="number" step="0.001" min="0.001" ref={comparisonInput} defaultValue={bagState.comparisonData}>        
               </input>
            </label>
            </div>

        )
        
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
                <h1 id="header" style={{ fontSize: "50px" }}>PIE CHART FORM</h1>
                     
                </div>
             </div>
                
                <h3 id="header-products" style={{ fontSize: "20px" }}>Products</h3>
                
                    
                    <h1>{bagState.name}  <img onMouseOver={handleMouseOverFirst} onMouseOut={handleMouseOutFirst} src={iIcon} width={15} height={15}></img></h1>
                   
                    <br></br>
                        {isHoveringFirstGraph && (
                            <div>
                                <img id='b' src={piechart1Background} alt='img' width={250} height={200}></img>
                            
                            </div>
                        )}    


                    
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