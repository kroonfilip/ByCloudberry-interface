import  {useRef, useState } from 'react';
import '../components/Form.css'
import "./style.css";
import { PopoverPicker } from "./PopoverPicker";



const FormUI = () => {

    const inputMaterial = useRef(null);
  
    function handleClick() {
        console.log(inputMaterial.current.value);
    }
    


  
    const [colorMaterial, setColorMaterial] = useState("#aabbcc");
    const [colorProduction, setColorProduction] = useState("#aabbcc");
    const [colorLogistics, setColorLogistics] = useState("#aabbcc");
    const [colorRecycling, setColorRecycling] = useState("#aabbcc");
    const [colorLining, setColorLining] = useState("#aabbcc");
    const [colorDetails, setColorDetails] = useState("#aabbcc");
    const [colorPackaging, setColorPackaging] = useState("#aabbcc");

    
  

    
    return (
        <form class="form">
            <h2> Add graph data</h2>
            <select>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected value="coconut">Coconut</option>
                <option value="mango">Mango</option>
               </select>
               
            <div id="div1">
              
            </div> 
            <label>
            <PopoverPicker color={colorMaterial} onChange={setColorMaterial} />
             Main material value (kg CO2E) 
            <br></br>
            <input type="Material" name="Material" ref={inputMaterial} />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorProduction} onChange={setColorProduction} />
            Production value (kg CO2E)
            <br></br>
            <input type="Production" name="Production" />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorLogistics} onChange={setColorLogistics} />
            Logistics value (kg CO2E)
            <br></br>
            <input type="Logistics" name="Logistics" />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorRecycling} onChange={setColorRecycling} />
            Recycling value (kg CO2E)
            <br></br>
            <input type="Recycling" name="Recycling" />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorLining} onChange={setColorLining} />    
            Lining value (kg CO2E)
            <br></br>
            <input type="Lining" name="Lining" />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorDetails} onChange={setColorDetails} />    
            Details value (kg CO2E)
            <br></br>
            <input type="Details" name="Details" />
            <br></br>
            </label>
            <label>
            <PopoverPicker color={colorPackaging} onChange={setColorPackaging} />    
            Packaging value (kg CO2E)
            <br></br>
            <input type="Packaging" name="Packaging" />
            <br></br>
            </label>
            <button onClick={handleClick}>Log message</button>
            
        </form>
 
      
       
    )
}
export default FormUI;