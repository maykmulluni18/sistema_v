import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Addmoreinput = () => {

  const [inputList, setinputList]= useState([{firstName:'', lastName:''}]);

  const handleinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);

  }
 
  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }

  const handleaddclick=()=>{ 
    setinputList([...inputList, { firstName:'', lastName:''}]);
  }
  return (
     <div className="row">
       <div className="col-sm-12">
         <h5 className="mt-3 mb-4 fw-bold">Dynamically add/remove inputs fields reactjs </h5>
           
            { 
            inputList.map( (x,i)=>{
              return(
                <>
                <form  type='submit' method="POST">
              <div className="row mb-3">
                 <div class="form-group col-md-4">
                 <label >First Name</label>
                  <input type="text"  name="firstName"  placeholder="Enter First Name" onChange={ e=>handleinputchange(e)} />
               </div>
               <div class="form-group col-md-4">
               <label >Last Name</label>
                  <input type="text"  name="lastName"    placeholder="Enter Last Name" onChange={ e=>handleinputchange(e) }/>
               </div>
              
            </div>
            </form> 
            <div class="form-group col-md-2 mt-4">
               {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleremove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
               <button  className="btn btn-success" onClick={ handleaddclick}>Add More</button>
               }
               </div>
              </>
              );
             } )} 

               
       </div>
     </div>
  );
}
export default Addmoreinput;
