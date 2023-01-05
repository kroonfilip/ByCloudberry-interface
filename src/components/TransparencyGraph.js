import  {React, useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import ColorPicker from './colorPicker';
import api from './Api';
import Header from './Header';
import {useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../context/hooks';
import { editTransparencyData, setBagState } from '../context/bagSlice';
import iIcon from '../Image/240px-Infobox_info_icon.png';
import bottomColorPic from '../Image/bottomColorPic.png';
import topColorPic from '../Image/topColorPic.png';
import onlineSEKPic from '../Image/onlineSEKPic.png';
import onlineEURPic from '../Image/onlineEURPic.png';
import retailSEKPic from '../Image/retailSEKPic.png';
import retailEURPic from '../Image/retailEURPic.png';

const TransparencyGraph = ({}) => {
    const bagState = useAppSelector((state) => state.bag);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    // setting the values to the corresponding values in the state
    // const initialValues = {
    //     bottomColor: bagState.bottomColor,
    //     topColor: bagState.topColor,
    //     retailEUR: bagState.retailEUR,
    //     retailSEK: bagState.retailSEK,
    //     onlineEUR: bagState.onlineEUR,
    //     onlineSEK: bagState.onlineSEK,
    //   };

    //create object initialValues and if bagState is not empty, set the values to the corresponding values in the state
    //else set the values to 0
    const initialValues = {
        bottomColor: bagState.transparency.bottomColor ? bagState.transparency.bottomColor : "#ffffff",
        topColor: bagState.transparency.topColor ? bagState.transparency.topColor : "#ffffff",
        retailEUR: bagState.transparency.retailEUR ? bagState.transparency.retailEUR : 0,
        retailSEK: bagState.transparency.retailSEK ? bagState.transparency.retailSEK : 0,
        onlineEUR: bagState.transparency.onlineEUR ? bagState.transparency.onlineEUR : 0,
        onlineSEK: bagState.transparency.onlineSEK ? bagState.transparency.onlineSEK : 0,

    };

    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
    const [errorTop, setErrorTop] = useState(null); 
    const scrollRef = useRef(null)

    // useStates to handle the information icons and to display them on hover.
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

    const handleInputChange = (e) => {
        /*
        handles the user input by setting name and value
        and checks the user input by calling the function checkColor
        */
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        checkColor()
    }
    
   function renderColorData(){
    /*
    function that renders the structure for the color fields
    */
    return (
        <div>
            <h1 style={{ fontFamily: "Quicksand", fontSize: "20px", 
            textAlign: 'center',}}>Colors</h1>
            
            <div>
                <label>
                Bottom Color (Hex value) <img onMouseOver={handleMouseOverBottom} onMouseOut={handleMouseOutBottom} src={iIcon} width={15} height={15}></img>
                <br></br>
                {isHoveringBottom && (
                    <div>
                        <img id='b' src={bottomColorPic} alt='img' 
                        width={350} height={350}></img>
                    </div>
                    )}
                    <p style= {{color: "red"}}> {error}</p>
                    <input
                    id='inputTransparency'
                    name='bottomColor' 
                    onChange={handleInputChange} 
                    defaultValue={bagState.transparency.bottomColor ? bagState.transparency.bottomColor : values.bottomColor}
                    key={bagState.transparency.bottomColor ? bagState.transparency.bottomColor : values.bottomColor}
                    // value={bagState.transparency.bottomColor ? bagState.transparency.bottomColor : values.bottomColor} 
                    >
                    </input>
                </label>
            </div>
            <div>
                <label>
                Top color (Hex value) <img onMouseOver={handleMouseOverTop} onMouseOut={handleMouseOutTop} src={iIcon} width={15} height={15}></img>
                <br></br>
                {isHoveringTop && (
                    <div>
                        <img id='b' src={topColorPic} alt='img' 
                        width={350} height={350}></img>
                    </div>
                    )}
                    <br></br>
                    <p style= {{color: "red"}}> {errorTop}</p>
                    <input
                    id='inputTransparency'
                    name='topColor' 
                    onChange={handleInputChange} 
                    defaultValue={bagState.transparencytopColor ? bagState.transparency.topColor : values.topColor}
                    key={bagState.transparency.topColor ? bagState.transparency.topColor : values.topColor}
                    // value={bagState.transparency.topColor ? bagState.transparency.topColor : values.topColor} 
                    >
                    </input>
                </label>
            </div>        
        </div>
    )
   }
    function renderOnlineData() {
        // function that renders the structure for the online currencies
        return (
            <div>
                <h1 id='subHeadline'>Online</h1>
                <label style={{}}>
                SEK<img onMouseOver={handleMouseOverOSEK} 
                onMouseOut={handleMouseOutOSEK} src={iIcon} width={15} 
                height={15}></img>
                <br></br>
                </label>
                {isHoveringOSEK && (
                    <div>
                        <img id='b' src={onlineSEKPic} alt='img' 
                        width={350} height={350}></img>
                    </div>
                )}
                <input id='inputTransparency' 
                    type="number"
                    min="1"
                    step="1"
                    name='onlineSEK' 
                    onChange={handleInputChange} 
                    // value={bagState.transparency.onlineSEK ? bagState.transparency.onlineSEK : values.onlineSEK}
                    key={bagState.transparency.onlineSEK ? bagState.transparency.onlineSEK : values.onlineSEK}
                    defaultValue={bagState.transparency.onlineSEK ? bagState.transparency.onlineSEK : values.onlineSEK}>
                </input>
                <div>
                    <label style={{}}>
                    EUR <img onMouseOver={handleMouseOverOEUR} 
                    onMouseOut={handleMouseOutOEUR} src={iIcon} width={15} 
                    height={15}></img>
                    <br></br>
                    </label>
                    {isHoveringOEUR && (
                        <div>
                            <img id='b' src={onlineEURPic} alt='img' 
                            width={350} height={350}></img>
                        </div>
                    )}
                    <input id='inputTransparency' 
                        min="1"
                        step="1"
                        type='number'
                        name='onlineEUR' 
                        onChange={handleInputChange} 
                        // value={bagState.transparency.onlineEUR ? bagState.transparency.onlineEUR : values.onlineEUR}
                        key={bagState.transparency.onlineEUR ? bagState.transparency.onlineEUR : values.onlineEUR}
                        defaultValue={bagState.transparency.onlineEUR ? bagState.transparency.onlineEUR : values.onlineEUR}>
                    </input>        
                </div>
            </div>
        )
    }

    function renderRetailData() {
        // function that renders the structure for the retail prices
            return (
                <div>
                    <h1 id='subHeadline' >Retail</h1>
                    <div>
                        <label key={"sek"} >
                            SEK<img onMouseOver={handleMouseOverRSEK} 
                            onMouseOut={handleMouseOutRSEK} src={iIcon} 
                            width={15} height={15}></img>
                        <br></br>
                        </label> 
                           {isHoveringRSEK && (
                                <div>
                                    <img id='b' src={retailSEKPic} alt='img' 
                                    width={350} height={350}></img>
                                </div>
                            )}
                        
                            <input 
                            name='retailSEK'
                            onChange={handleInputChange} 
                            id='inputTransparency' type="number" step="1" min="1" 
                            // value={bagState.transparency.retailSEK ? bagState.transparency.retailSEK : values.retailSEK}
                            key={bagState.transparency.retailSEK ? bagState.transparency.retailSEK : values.retailSEK}
                            defaultValue={bagState.transparency.retailSEK ? bagState.transparency.retailSEK : values.retailSEK}>
                            </input>
                    </div>
                    <div>
                        <label key={"eur"}>
                        EUR <img onMouseOver={handleMouseOverREUR}
                        onMouseOut={handleMouseOutREUR} src={iIcon} 
                        width={15} height={15}></img>
                        <br></br>
                        </label> 
                            {isHoveringREUR && (
                                <div>
                                    <img id='b' src={retailEURPic} alt='img' 
                                    width={350} height={350}></img>
                                </div>
                            )}
                            <input 
                            name='retailEUR' 
                            onChange={handleInputChange} 
                            key={bagState.transparency.retailEUR ? bagState.transparency.retailEUR : values.retailEUR}
                            defaultValue={bagState.transparency.retailEUR ? bagState.transparency.retailEUR : values.retailEUR}
                            id='inputTransparency' type="number" step="1" min="1" 
                            // value={bagState.transparency.retailEUR ? bagState.transparency.retailEUR : values.retailEUR}
                            >
                            </input>
                        </div>
                </div>
            )
        }
    useEffect(() => {
        // enables to check every user input for the error handling
        checkColor()
        handleScroll()
    }, [values])

    const checkColor = (e) => {
        /*
        function that checks if the input fields regarding the hexcolors start
        with # and is 7 characters long. If the user does anything wrong, the useState 
        triggers and give an alert. 
        */
    
        if (values.bottomColor.startsWith("#") && values.bottomColor.length === 7
        ) {
            console.log("BOT", values.bottomColor)
            setError(null);
        
        }else {
            setError('Error: # is missing and is not containing 6 characters');
        }
        if (values.topColor.startsWith("#") && values.topColor.length === 7) {
            console.log("TOP", values.topColor)
            setErrorTop(null);
        }else {
            setErrorTop('Error: # is missing and is not containing 6 characters');
        }

    }
   
    const handleSubmit = (e) => {
        /*
        handles the submition by checking if the input fields are correct
        and then updating the state and db with the new values
        */
        if(error || errorTop){
            e.preventDefault()
            alert("Form could not be submitted. Check the input fields")
        }else{
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
            alert("Form has been submitted")
            navigate("/")
        }
    }
    const routeToPrevious = () => {
        navigate("/form")
    }
    const handleScroll = () => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
    return (
        <>
            <Header/>
            <form className='form' onSubmit={handleSubmit}>
            <div id="hero-image">
                <div id="hero-text">
                    <h1 style={{color:'white', fontSize: "40px",
                     position:'relative', top:300}}>TRANSPARANCY DATA FORM</h1>
                </div>
            </div>
            
            <h1 ref={scrollRef} style={{fontSize: "20px", paddingTop:"50px"}}>Product: {bagState.name} 
            </h1>
            {renderOnlineData()}
            {renderRetailData()}
            {renderColorData()}
                
            <div>
                <button style={{display: true ? 'inline-block': 'none'}}
                id="back-button" onClick={routeToPrevious}value='back'>Back</button>
                <button style={{display: true ? 'inline-block': 'none'}}
                id="save-button" value='submit'>Save and continue</button>
            </div>
            <div className='colorPicker'>
            <ColorPicker></ColorPicker>
            </div>
            </form>
        </>
    )
}
export default TransparencyGraph;