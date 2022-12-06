import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';

import updateBag from './Api';
import Header from './Header';
import transparancyBackground from './transparencyBackground.png';

const TransparencyGraph = () => {
    const url = "https://bycloudberry-server.onrender.com/getbag";
    //const [data, setData] = useState("");

    const transparencydata = {
        bottomColor: "#D9D9D9",
        topColor: "#A6A6A6",
        online: {
            SEK: 5645,
            EUR: 525,
            
        },
        retail: {
            SEK: 14113,
            EUR: 1313,

        },
    }
   function renderColorData(){
    return (
        <div>
            <h1 style={{ fontFamily: "Quicksand", fontSize: "20px", textAlign: 'center',}}>Colors</h1>
            
            <div>
                <label>
                    Bottom Color (Hex value)
                    <br></br>
                    <input placeholder = {transparencydata.bottomColor} ></input>
                </label>
            </div>
            <div >
                <label>
                    Top color (Hex value)
                    <br></br>
                    <input placeholder = {transparencydata.topColor} ></input>
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
                            <input placeholder = {transparencydata.online.SEK} ></input>
                        </label>
                    </div>
                    <div >
                        <label>
                            EUR
                            <br></br>
                            <input placeholder = {transparencydata.online.EUR} ></input>
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
                            <input type="number" step="1" min="1"  placeholder = {transparencydata.retail.SEK}>
                            </input>
                        
                        </label> 
                    </div>
                    <div >
                        <label key={"eur"}>
                            EUR 
                            <br></br>
                            <input type="number" step="1" min="1"  placeholder = {transparencydata.retail.EUR}>
                            </input>
                        
                        </label> 
                    </div>
                </div>
            )
}

    return (
        <>
            < Header/>
            <form  class="form" >
            
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