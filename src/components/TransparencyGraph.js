import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';

import updateBag from './Api';
import Header from './Header';
import iIcon from '../Image/240px-Infobox_info_icon.png'
import bottomColorPic from '../Image/bottomColorPic.png'
import topColorPic from '../Image/topColorPic.png'
import onlineEURPic from '../Image/onlineEURPic.png'
import retailEURPic from '../Image/retailEURPic.png'
import onlineSEKPic from '../Image/onlineSEKPic.png'
import retailSEKPic from '../Image/retailSEKPic.png'

const TransparencyGraph = () => {
    const url = "https://bycloudberry-server.onrender.com/getbag";
    //const [data, setData] = useState("");
    const [isHoveringBottom, setIsHoveringBottom] = useState(false);
    const [isHoveringTop, setIsHoveringTop] = useState(false);
    
    const [isHoveringOSEK, setIsHoveringOSEK] = useState(false);
    const [isHoveringRSEK, setIsHoveringRSEK] = useState(false);
    
    const [isHoveringOEUR, setIsHoveringOEUR] = useState(false);
    const [isHoveringREUR, setIsHoveringREUR] = useState(false);
    
    /* 
        To handle the states of the picture displaying the 'help'-image - Bottom color
    */
    const handleMouseOverBottom = () => {
        setIsHoveringBottom(true);
    };
  
    const handleMouseOutBottom = () => {
      setIsHoveringBottom(false);
    };

  /* 
        To handle the states of the picture displaying the 'help'-image - Top color
    */
    const handleMouseOverTop = () => {
      setIsHoveringTop(true);
    };
  
    const handleMouseOutTop = () => {
      setIsHoveringTop(false);
    };

    /* 
        To handle the states of the picture displaying the 'help'-image - Online SEK
    */
    const handleMouseOutOSEK = () => {
      setIsHoveringOSEK(false);
    };
    const handleMouseOverOSEK = () => {
      setIsHoveringOSEK(true);
    };
    /* 
        To handle the states of the picture displaying the 'help'-image - Retail SEK
    */
  
    const handleMouseOverRSEK = () => {
        setIsHoveringRSEK(true);
    };
    
    const handleMouseOutRSEK = () => {
      setIsHoveringRSEK(false);
    };
    /* 
        To handle the states of the picture displaying the 'help'-image - Retail EUR
    */

    const handleMouseOverREUR = () => {
        setIsHoveringREUR(true);
    };
    
    const handleMouseOutREUR = () => {
      setIsHoveringREUR(false);
    };
  
    /* 
        To handle the states of the picture displaying the 'help'-image - Online EUR
    */
    const handleMouseOverOEUR = () => {
        setIsHoveringOEUR(true);
    };
    
    const handleMouseOutOEUR = () => {
      setIsHoveringOEUR(false);
    };
  

    
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
            <h1 id='subHeadline'>Colors</h1>
            
            <div >
                <label >
                    Bottom Color (Hex value) <img onMouseOver={handleMouseOverBottom} onMouseOut={handleMouseOutBottom} src={iIcon} width={15} height={15}></img>
                    <br></br>
                    {isHoveringBottom && (
                        <div>
                            <img id='b' src={bottomColorPic} alt='img' width={350} height={350}></img>
                          
                        </div>
                    )}
                    <input id='inputTransparency' placeholder = {transparencydata.bottomColor} ></input>
                </label>
            </div>
            <div >
                <label>
                    Top color (Hex value) <img onMouseOver={handleMouseOverTop} onMouseOut={handleMouseOutTop} src={iIcon} width={15} height={15}></img>
                    <br></br>
                    {isHoveringTop && (
                        <div>
                            <img id='b' src={topColorPic} alt='img' width={350} height={350}></img>
                          
                        </div>
                    )}
                    <input id='inputTransparency' placeholder = {transparencydata.topColor} ></input>
                </label>
            </div>        
        </div>
    )
   }
    function renderOnlineData() {
            return (
                <div>
                    <h1 id='subHeadline'>Online</h1>
                    
                
                    <label style={{}}>
                        SEK<img onMouseOver={handleMouseOverOSEK} onMouseOut={handleMouseOutOSEK} src={iIcon} width={15} height={15}></img>
                        <br></br>
                    </label>
                        {isHoveringOSEK && (
                            <div>
                                <img id='b' src={onlineSEKPic} alt='img' width={350} height={350}></img>
                            
                            </div>
                        )}
                
                        <input id='inputTransparency' placeholder = {transparencydata.online.SEK} ></input>
                    <div >
                        <label style={{}}>
                            EUR <img onMouseOver={handleMouseOverOEUR} onMouseOut={handleMouseOutOEUR} src={iIcon} width={15} height={15}></img>
                            <br></br>
                        </label>
                            {isHoveringOEUR && (
                                <div>
                                    <img id='b' src={onlineEURPic} alt='img' width={350} height={350}></img>
                                
                                </div>
                            )}
                            <input id='inputTransparency' placeholder = {transparencydata.online.EUR} ></input>
                    </div>        
                </div>
              
            )

       
    
}
    function renderRetailData() {
            return (
                <div>
                    <h1 id='subHeadline' >Retail</h1>
                    <div >
                        <label key={"sek"} >
                            SEK<img onMouseOver={handleMouseOverRSEK} onMouseOut={handleMouseOutRSEK} src={iIcon} width={15} height={15}></img>
                           <br></br>
                        </label> 
                           {isHoveringRSEK && (
                                <div>
                                    <img id='b' src={retailSEKPic} alt='img' width={350} height={350}></img>
                                
                                </div>
                            )}
                        
                            <input id='inputTransparency' type="number" step="1" min="1"  placeholder = {transparencydata.retail.SEK}>
                            </input>
                    </div>
                    <div >
                        <label key={"eur"}>
                            EUR <img onMouseOver={handleMouseOverREUR} onMouseOut={handleMouseOutREUR} src={iIcon} width={15} height={15}></img>
                            <br></br>
                        </label> 
                            {isHoveringREUR && (
                                <div>
                                    <img id='b' src={retailEURPic} alt='img' width={350} height={350}></img>
                                
                                </div>
                            )}
                            <input id='inputTransparency' type="number" step="1" min="1"  placeholder = {transparencydata.retail.EUR}>
                            </input>
                        
                    </div>
                </div>
            )
}

    return (
        <>
            < Header/>
            <form className='form' >
            
                <div id="hero-image">
                    <div id="hero-text">
                    <h1 style={{color:'white', fontSize: "40px", position:'relative', top:300}}>TRANSPARANCY DATA FORM</h1>
                        
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