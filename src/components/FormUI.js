import  { useEffect, useState }from 'react';
import '../components/Form.css'
import { SketchPicker } from 'react-color';
import { useRef } from 'react';



const FormUI = () => {

    const submit = (e) => {
        e.preventDefault();
        
    }
    
    

    
    

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
            Main material value (kg CO2E)
            <br></br>
            <input type="Material" name="Material" />
            <br></br>
            </label>
            <label>
            Production value (kg CO2E)
            <br></br>
            <input type="Production" name="Production" />
            <br></br>
            </label>
            <label>
            Logistics value (kg CO2E)
            <br></br>
            <input type="Logistics" name="Logistics" />
            <br></br>
            </label>
            <label>
            Recycling value (kg CO2E)
            <br></br>
            <input type="Recycling" name="Recycling" />
            <br></br>
            </label>
            <label>
            Lining value (kg CO2E)
            <br></br>
            <input type="Lining" name="Lining" />
            <br></br>
            </label>
            <label>
            Details value (kg CO2E)
            <br></br>
            <input type="Details" name="Details" />
            <br></br>
            </label>
            <label>
            Packaging value (kg CO2E)
            <br></br>
            <input type="Packaging" name="Packaging" />
            <br></br>
            </label>
            <input onClick={submit}type="submit" value="Submit" />
            
        </form>
        

                
                    
                   
                        
                        
                        
            
      
       
    )
}
export default FormUI;