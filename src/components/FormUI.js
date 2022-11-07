import  {useEffect, useRef, useState } from 'react';
import './Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';


const FormUI = () => {
   
    const url = "https://bycloudberry-server.onrender.com/getbag";

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
            color: "black",
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

    let addFormFields = () => {
    setFormValues([...formValues, { name: ""}])
    }

    const [value, setValue] = useState("");

    const handle = (e) => {
        setValue(e.target.value);
      };
    

    const inputRef = useRef([]);
    const colorRef = useRef([]);
    const comparisonInput = useRef([]);
    
    function renderData() {
            var renderData = data ? data.data.graphdata.map((item, index) => {
        
                return (
                    
                   <>
                   
                    <label key={index}>
                     {item.type} (kg CO2E) 
                    <input type="number" step="0.001" min="0.001"  placeholder = {item.amount} ref={(ref) => (inputRef.current[index] = ref)} value={item.value}>
                    </input>
                    </label>
                    <label key={item.color}>
                        (Hex color)
                    <input placeholder = {item.color} ref={(ref) => (colorRef.current[item.color] = ref)} value={item.value}></input>
                    </label>
                   
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
            <label>
                Comparison Data
               <input type="number" step="0.001" min="0.001" ref={comparisonInput} placeholder= {comparisonData}>        
               </input>
            </label>

        )

    }
    console.log(comparisonInput)

   function drpdown() {

    var renderData = dataName ? dataName.data.map((item) => {
        const all_products = item.name
        const type = item.type

        console.log(all_products)      

        return (
        
        <option value="product">{all_products} {type}</option>
        
        )
        
  }): "";
   
  

   return renderData;
   
   }

    return (
       <>
         
        <form  class="form">
        <h2> Add & Edit Graph Data</h2>
        <ColorPicker></ColorPicker>
            <div>
                <h4>Products</h4>
                    <select value={value} onChange={handle}>
                    <option value="" disabled selected>Select a product</option>
                    {drpdown()}
                    </select>
                    {ComparisonData()}
            </div>

            {renderData()}
            
            <button value='submit'>Save changes</button>
           
            </form>

            </>
        
    )
}
export default FormUI;