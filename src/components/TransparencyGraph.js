import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';

import api from './Api';
import Header from './Header';
import {useNavigate} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../context/hooks';
import { editTransparencyData, setBagState } from '../context/bagSlice';

const TransparencyGraph = ({bagData}) => {
    const url = "https://bycloudberry-server.onrender.com/getbag";
    //const [data, setData] = useState("");

    const bagState = useAppSelector((state) => state.bag);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const initialValues = {
        bottomColor: "",
        topColor: "",
        onlineSEK: "",
        onlineEUR: "",
        retailSEK: "",
        retailEUR: "",
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

   function renderColorData(){
    return (
        <div>
            <h1 style={{ fontFamily: "Quicksand", fontSize: "20px", textAlign: 'center',}}>Colors</h1>
            
            <div>
                <label>
                    Bottom Color (Hex value)
                    <br></br>
                    <input
                     name='bottomColor' 
                     placeholder={bagState.bottomColor}
                     onChange={handleInputChange} 
                     value={values.bottomColor} >
                     </input>
                    
                </label>
            </div>
            <div >
                <label>
                    Top color (Hex value)
                    <br></br>
                    <input
                     name='topColor' 
                     placeholder={bagState.topColor}
                     onChange={handleInputChange} 
                     value ={values.topColor} >
                     </input>
                </label>
            </div>        
        </div>
    )
   }
    function renderOnlineData() {
            return (
                <div>
                    <h1 style={{ fontFamily: "Quicksand", fontSize: "20px", }}>Online</h1>
                    
                    <div>
                        <label>
                            SEK
                            <br></br>
                            <input 
                            name='onlineSEK' 
                            placeholder={bagState.onlineSEK}
                            onChange={handleInputChange} 
                            value={values.onlineSEK} >
                            </input>
                        </label>
                    </div>
                    <div >
                        <label>
                            EUR
                            <br></br>
                            <input 
                            name='onlineEUR' 
                            placeholder={bagState.onlineEUR}
                            onChange={handleInputChange} 
                            value={values.onlineEUR} >
                            </input>
                        </label>
                    </div>        
                </div>
              
            )

       
    
}
    function renderRetailData() {
            return (
                <div>
                    <h1 style={{ fontFamily: "Quicksand", fontSize: "20px", }}>Retail</h1>
                    <div >
                        <label key={"sek"}>
                            SEK
                           <br></br>
                            <input 
                            onChange={handleInputChange} 
                            name='retailSEK'
                            placeholder={bagState.retailSEK}
                            type="number" 
                            step="1" min="1"  
                            value={values.retailSEK}>
                            </input>
                        
                        </label> 
                    </div>
                    <div >
                        <label key={"eur"}>
                            EUR 
                            <br></br>
                            <input 
                            onChange={handleInputChange} 
                            name='retailEUR'
                            placeholder={bagState.retailEUR}
                            type="number" 
                            step="1" min="1"  
                            value={values.retailEUR}>
                            </input>
                        
                        </label> 
                    </div>
                </div>
            )
}
    
    const handleSubmit = (e) => {
       
        e.preventDefault()

        const transparency = {
            bottomColor: values.bottomColor,
            topColor: values.topColor,
            onlineSEK: parseInt(values.onlineSEK),
            onlineEUR: parseInt(values.onlineEUR),
            retailSEK: parseInt(values.retailSEK),
            retailEUR: parseInt(values.retailEUR),
        }

        api.updateBag({
            name: bagState.name,
            bagtype: bagState.bagtype,
            transparency: transparency,
        }).then((res) => {
            console.log(res)
        })

        
        dispatch(editTransparencyData(transparency))
   
       
        navigate("/")
    }

    return (
        <>
            < Header/>
            <form  class="form" onSubmit={handleSubmit}>
            
                <div id="hero-image">
                    <div id="hero-text">
                    <h1 id="header" style={{ fontSize: "40px" }}>TRANSPARANCY DATA FORM</h1>
                        
                    </div>
                </div>
                
                    {renderOnlineData()}
                    {renderRetailData()}
                    {renderColorData()}
                
                    
                <div>
                    <button style={{display: true ? 'inline-block': 'none'}}id="back-button" value='back'>Back</button>
                    <button style={{display: true ? 'inline-block': 'none'}}id="save-button" value='submit'>Save and continue</button>
                </div>
                <div className='colorPicker'>
                <ColorPicker></ColorPicker>
                </div>
    
            </form>
        </>
    )
}
export default TransparencyGraph;