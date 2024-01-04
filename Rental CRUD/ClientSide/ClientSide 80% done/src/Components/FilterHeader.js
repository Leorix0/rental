import React,{useState,useEffect} from 'react';
import './Style/filter.css';


function FilterHeader() {
  
      const [querry, setQuerry] = useState("");
  
      const search = (data) => {
          return data.filter(
              (item) =>
                  item.type.toLowerCase().includes(querry) ||
                  item.milage.toLowerCase().includes(querry)
                 
          );
      };
  
   return (
      <div id="form">
         <div id="button">
            
            <select className="select" onChange={(e) => setQuerry(e.target.value)}>
            
               <option>ToolType</option>
               <option>Tractor</option>
    <option>Plow</option>
    <option>Harvester</option>
    <option>Seeder</option>
    <option>Irrigation System</option>
            </select>
   
            <select className="select" onChange={(e) => setQuerry(e.target.value)} >
             
               <option>Days</option>
             <option>1 Day</option>
                            <option>2 Days</option>
                            <option>3 Days</option>
                            <option>4-5 Days</option>
                            <option>1-2 Weeks</option>
            </select>

            <select className="select" onChange={(e) => setQuerry(e.target.value)}>
           
               <option>Persons</option>
               <option>10</option>
               <option>6</option>
               <option>4</option>
            </select>

         </div>
         <div>
         
         </div>
      </div>

   )
}
export default FilterHeader;
