import  {useEffect, useRef, useState } from 'react';
import '../components/Form.css'
import "./style.css";
import axios from "axios";
import ColorPicker from './colorPicker';






/*
(kg CO2E) 
<PopoverPicker color={colorMaterial} onChange={setColorMaterial} />
*/


const FormUI = () => {
   
    

    const url = "https://bycloudberry-server.onrender.com/getbag";

    const [data, setData] = useState("");
    
    useEffect(() => {
        fetchData().then((res) => setData(res.data))
    }, [])
    
    const fetchData = () => {
        return axios.get("https://bycloudberry-server.onrender.com/getbag", {
          params: {
            name: "disa",
            color: "black",
            type: "handbag",
          },
        });
    }
    console.log(data)
    /*
    function handleClick() {
        console.log(inputMaterial.current.value);
        console.log(inputDetails.current.value)
        
    }
    */
    const submit = (e) => {
        e.preventDefault();
        
    }
   
   
    
    
    
    
    

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
    
    
    
    function renderData() {
        
        var renderData = data ? data.graphdata.map((item, index) => {
           

           
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
    return (
       <>
            
            
            <form  class="form" onSubmit={e =>{submit(e);}}>
            <h2> Add & Edit Graph Data</h2>
            <ColorPicker></ColorPicker>
                <div>
                    <h4>Products</h4>
                    
                    <select value={value} onChange={handle}>
                    <option value="" disabled selected>Select a product</option>
                    <option value="product">{data.name} {data.color} {data.bagtype}</option>
                    
                    </select>

                   
                </div>

            
            {renderData()}
            
            <button value='submit'>Save changes</button>
            
           
            
            </form>
            </>
        
      
       
    )
}
export default FormUI;