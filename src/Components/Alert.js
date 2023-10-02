import React from 'react';

export default function Alert(props) {
  return (
    <div  >
      {console.log("Alert is:", props.alert)}
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show `} style={{textAlign:"center"}} id="alert" role="alert">

          {props.alert.msg} 
          
        </div>
      )}
    </div>
  );
}


