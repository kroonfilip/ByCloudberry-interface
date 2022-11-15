import  {useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';
import api from './test';
import updateBag from './test';



const FormUI = () => {
   
    const url = "https://bycloudberry-server.onrender.com/getbag";
    const postURL = "https://bycloudberry-server.onrender.com/insertbag"
    const [data, setData] = useState("");
    const [dataName, setDataName] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchDatabyName()

    }, [])

    const fetchData = async() => {
        const resp = await axios.get("https://bycloudberry-server.onrender.com/getbag", {
          params: {
            name: "disa",
            type: "handbag",
          },
        });
        setData(resp)
        return resp
    }
    
    const fetchDatabyName = async () => {
        const resp = await axios.get("https://bycloudberry-server.onrender.com/getbagnames", {
         
        });
        console.log(resp)
        setDataName(resp)
        return resp
    }
    console.log(data)
    console.log(dataName)
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

        const prodValue = productValue.current
        const allProductsValue = allProductRef
        console.log(allProductsValue)
        console.log(prodValue)
        console.log(inputLeather); // 👈️ element here
        console.log(inputProduction)
        console.log(inputLogistics)
        console.log(inputRecycling)
        console.log(inputLining)
        console.log(inputPackaging)
        console.log(inputDetails)
        
        console.log(colorLeather)
        console.log(colorProduction)
        console.log(colorLogistics)
        console.log(colorRecycling)
        console.log(colorLining)
        console.log(colorPackaging)
        console.log(colorDetails)
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        updateBag({name : productValue, bagtype: 'handbag', graphdata: [
            { type: "Leather", amount: inputRef.current[0].value, color: colorRef.current[0].value},
            { type: "Production", amount: inputRef.current[1].value, color: colorRef.current[1].value },
            { type: "Logistics", amount: inputRef.current[2].value, color: colorRef.current[2].value },
            { type: "Recycling", amount: inputRef.current[3].value, color: colorRef.current[3].value},
            { type: "Lining", amount: inputRef.current[4].value, color: colorRef.current[4].value },
            { type: "Packaging", amount: inputRef.current[5].value, color: colorRef.current[5].value},
            { type: "Details", amount: inputRef.current[6].value, color: colorRef.current[6].value },
            
            
          ]}).then((res) => {
            console.log(res);
          });
        }
        
    /*
     function addPosts() {
        axios
          .post(postURL, {
            bagtype: "handbag",
            name: "Disa",
            color: "blue",
            comparisonData: 66.11,
            
          })
          .then((response) => {
            setData(response.data);
            console.log(response.data)
          });
          
        
      }
    */
      
    
        
    /*
    function handleClick() {
        console.log(inputMaterial.current.value);
        console.log(inputDetails.current.value)
        
    }
    */

    const [formValues, setFormValues] = useState([{ name: ""}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }

    
    const getInitialState = () => {
        const productValue = data ? data.data.name: ""
        return productValue
    }
    const [productValue, setValue] = useState("");
/*
    const handle = (e) => {
        setValue(e.target.productValue);
       console.log(e.target.value)
        
      };
    */

    const inputRef = useRef([]);
    const colorRef = useRef([]);
    const comparisonInput = useRef([]);
    const allProductRef = useRef();
    
    
    
    function renderData() {
            var renderData = data ? data.data.graphdata.map((item, index) => {
        
                return (
                    
                   <>
                    <div className='field'>
                    <label key={index}>
                     {item.type} (kg CO2E) 
                     <br></br>
                    <input type="number" step="0.001" min="0.001"  placeholder = {item.amount} ref={(ref) => (inputRef.current[index] = ref)} value={item.value}>
                    </input>
                    
                    </label>
                    </div>
                    <div className='field'>
                    <label key={index}>
                    {item.type} (Hex color)
                    <br></br>
                    <input placeholder = {item.color} ref={(ref) => (colorRef.current[index] = ref)} value={item.value}></input>
                    </label>
                   
                    </div>
                   
                    </>

                )

            }): "TOM DATA";

        return renderData;
        
    }
  
    console.log(inputRef.current)
    console.log(colorRef.current)
    
    /*
    console.log(inputRef.current[0].value)
    console.log(inputRef.current[1].value)
    */

    function ComparisonData() {
        
        var comparisonData = data ? data.data.comparisonData:""

        return (
            <div className='field'>
            <label>
                Comparison Data
                <br></br>
               <input type="number" step="0.001" min="0.001" ref={comparisonInput} placeholder= {comparisonData}>        
               </input>
            </label>
            </div>

        )

    }
   
    console.log(comparisonInput)


   

   function drpdown() {

    var renderData = dataName ? dataName.data.map((item) => {
        const all_products = item.name
        const type = item.type

        
        console.log(all_products)      
        

        return (
    
            <option value1= {all_products} value2={type} ref={allProductRef}> {all_products} {type}</option>
            
        
        )
        
        
  }): "";
   

   return renderData;
   
   }

    return (
       <>
         
        <form  class="form" onSubmit={handleSubmit}>
            
            <div id="hero-image">
                <div id="hero-text">
                <h1 id="header" style={{ fontSize: "50px" }}>GRAPH DATA FORM</h1>
                     
             </div>

             </div>
                
        
                <h3 id="header-products" style={{ fontSize: "20px" }}>Products</h3>
                    <select style={{ textAlign:'center'}} value={productValue} onChange={e=> {setValue(e.target.value); fetchData();}} >
                    <option value="" style={{ textAlign:'center', padding:'30px' }} disabled selected>Select a product</option>
                    {drpdown()}
                    
                    </select>
                    
                    <h1>{productValue}</h1>
                    
            
           

            {renderData()}
            {ComparisonData()}
            <button id="save-button" value='submit'>Save Changes</button>
            <div className='colorPicker'>
            <ColorPicker></ColorPicker>
            </div>

                   
            </form>

            </>
        
    )
}
export default FormUI;