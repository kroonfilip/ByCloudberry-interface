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
    const [data, setData] = useState("");
    const [dataName, setDataName] = useState("");

    const bagState = useAppSelector((state) => state.bag);
    const dispatch = useAppDispatch();

    /*
    The following variables are the 3 different refs used for the input fields, 
    as well as the hovering states for the info icons.
    */
    const inputRef = useRef([]);
    const colorRef = useRef([]);
    const comparisonInput = useRef([]);
    const [isHoveringFirstGraph, setIsHoveringFirstGraph] = useState(false);
    const [isHoveringSecondGraph, setIsHoveringSecondGraph] = useState(false);

    
    useEffect(() => {
        fetchDatabyName()
        

    }, [])

    /*
    The following 4 function handles the hovering functions on the 
    icons.
    */
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
        // fetches the product names from the db and stores in state
        const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
         
        });
        setDataName(resp)
        return resp
    }
    useEffect(() => {
        /*
        stores all the input refs with their specific index in the useEffect
        in order to be able to reach their values when sending the form.
        */
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
        /*
        This submit function checks if the user has misspelled anything in the input
        fields. If they have, call the error state and trigger an alert and stop the 
        form. If correct, continue by submitting the given input values in graphdata and
        send it to the db. Also updates the state with dispatch.
        */
        if(error) {
            e.preventDefault()
            alert("Form could not be submitted. Check the input fields")
        }else{
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
    }
    
    const [isActive, setActive] = useState(false);
    // functionn that triggers the state to display/hide certain elements
    const toggleClass = () => {
        setActive(true);
    }
    
    const [error, setError] = useState(null);
    const checkColor = (e) => {
        /*
        function that checks if the input fields regarding the hexcolors start
        with # and is 7 characters long. If the user does anything wrong, the useState 
        triggers and give an alert. 
        */
        const newInput = e.target.value;
        if (newInput.startsWith("#") && newInput.length == 7) {
            setError(null);
            colorRef.current.value = newInput;
            
        }else {
            setError('Error: # is missing and is not containing 6 characters');
            e.preventDefault()
        }

    }

    function renderData() {
        /*
        function that loops over the items in the redux state and set
        the input fields to the corresponding values in the db. The user input is also stored 
        in the ref that creates an array to store the specific values in the correct index.
        */
        var renderData = bagState ? bagState.graphdata.map((item, index) => {

        return (
            
            <>
                <div className='field'>
                    <label key={index}>
                    {item.type} (kg CO2E) 
                    <br></br>
                    <input type="number" step="0.001" min="0.001"  ref={(ref) => (inputRef.current[index] = ref)} 
                    key ={item.amount} defaultValue={item.amount} placeholder={item.amount} value={item.value}>
                    </input>
            
                    </label>
                </div>
                <div className='field'>
                    <label key={index}>
                    {item.type} (Hex color)
                    <br></br>
                    <p style= {{color: "red"}}> {error}</p>
                    <input onChange = {checkColor}ref={(ref) => (colorRef.current[index] = ref)} 
                    key={item.color} defaultValue={item.color}placeholder={item.color} value={item.value}></input>
                    </label>
            
                </div>
            </>
        )

    }): "";
    return renderData;
    }

    function ComparisonData() {
        /*
        function that fetches the value from the state redux to be displayed in the 
        comparison input field. Also stores the given input in ref.
        */
        
        console.log(bagState.comparisonData)
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
                <input type="number" step="0.001" min="0.001" ref={comparisonInput} key={bagState.comparisonData} defaultValue={bagState.comparisonData}>        
                </input>
                </label>
            </div>
        )
    }

    const routeToHome = () => {
    navigate("/")
    }
  
    /*
        returns the html code on the website. Also displays the colorpicker. 
    */
    return (
        <>
            <Header/>
            <form class="form" onSubmit={handleSubmit}>
                <div id="hero-image">
                    <div id="hero-text">
                    <h1 id="header" style={{ fontSize: "50px" }}>PIE CHART FORM</h1>
                    <h3 id="headerName" style={{fontSize: "30px"}}> Selected product: <br></br>{bagState.name}</h3>
                    </div>
                </div>
                <h1 style={{fontSize: "20px", paddingTop:"15px"}}>Product: {bagState.name}  <img onMouseOver={handleMouseOverFirst} onMouseOut={handleMouseOutFirst} src={iIcon} width={15} height={15}></img></h1>
                <br></br>
                {isHoveringFirstGraph && (
                <div>
                    <img id='b' src={piechart1Background} alt='img' width={250} height={200}></img>
                </div>
                )}    
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