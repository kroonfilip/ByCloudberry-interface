import  {useRef, useState } from 'react';
import '../components/Form.css'
import "./style.css";
import { PopoverPicker } from "./PopoverPicker";



const FormUI = () => {


    const inputMaterial = useRef();
    const inputProduction = useRef();
    const inputLogistics = useRef();
    const inputRecycling = useRef();
    const inputLining = useRef();
    const inputDetails = useRef();
    const inputPackaging = useRef();
    
    function handleClick() {
        console.log(inputMaterial.current.value);
        console.log(inputDetails.current.value)
        
    }

    const submit = (e) => {
        e.preventDefault();
        
    }
   
   
    
    
    const [colorMaterial, setColorMaterial] = useState("#aabbcc");
    console.log(colorMaterial)
    const [colorProduction, setColorProduction] = useState("#aabbcc");
    const [colorLogistics, setColorLogistics] = useState("#aabbcc");
    const [colorRecycling, setColorRecycling] = useState("#aabbcc");
    const [colorLining, setColorLining] = useState("#aabbcc");
    const [colorDetails, setColorDetails] = useState("#aabbcc");
    const [colorPackaging, setColorPackaging] = useState("#aabbcc");

    const [formValues, setFormValues] = useState([{ name: ""}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }

    let addFormFields = () => {
    setFormValues([...formValues, { name: ""}])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
       
  

    
    return (
        <form class="form" onSubmit={e =>{submit(e);handleClick();{addFormFields();}}}>
            <h2> Add graph data</h2>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>Name</label>
                    <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                   
                    {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
                    }
                <select>
                { formValues.map(item => <option>{item.name}</option>) }
                <option value="Disa Black">Disa Black</option>
                <option value="Disa Sandy Beach">Disa Sandy Beach</option>
                <option selected value="Natt Black">Natt Black</option>
                <option value="Natt Sandy Beach">Natt Sandy Beach</option>
                <option value="Alve Black">Alve Black</option>
                <option value="Alve Brown">Alve Brown</option>
                <option value="Alve Sandy Beach">Alve Sandy Beach</option>
                <option value="Ask Black">Ask Black</option>
                <option value="Ask Sandy Beach">Ask Sandy Beach</option>
                <option value="Wally Black">Wally Black</option>
                <option value="Wally Sandy Beach">Wally Sandy Beach</option>
               </select>

               

               
               
               
               
                </div>
            ))}
                
            <div className="button-section">
              <button className="button add" type="button" >Add</button>
              
            </div>
                
            
           
              
           
            <label>
            <PopoverPicker color={colorMaterial} onChange={setColorMaterial} />
             Main material value (kg CO2E) 
            <br></br>
            <input type="number" step="0.001" min="0.001"name="Material" ref={inputMaterial} />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorProduction} onChange={setColorProduction} />
            Production value (kg CO2E)
            <br></br>
            <input type="number" step="0.001"  min="0.001"name="Production" ref={inputProduction}/>
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorLogistics} onChange={setColorLogistics} />
            Logistics value (kg CO2E)
            <br></br>
            <input type="number" step="0.001"  min="0.001"name="Logistics" ref={inputLogistics}/>
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorRecycling} onChange={setColorRecycling} />
            Recycling value (kg CO2E)
            <br></br>
            <input type="number" step="0.001"  min="0.001"name="Recycling" ref={inputRecycling}/>
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorLining} onChange={setColorLining} />    
            Lining value (kg CO2E)
            <br></br>
            <input type="number" step="0.001"  min="0.001"name="Lining" ref={inputLining}/>
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorDetails} onChange={setColorDetails} />    
            Details value (kg CO2E)
            <br></br>
            <input type="number" step="0.001"  min="0.001"name="Details" ref={inputDetails}/>
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorPackaging} onChange={setColorPackaging} />    
            Packaging value (kg CO2E)
            <br></br>
            <input type="number" step="0.001" min="0.001" name="Packaging" ref={inputPackaging}/>
            <br></br>
            </label>
            <button value='submit'>Save changes</button>
            
           
            
            
        </form>
        
      
       
    )
}
export default FormUI;