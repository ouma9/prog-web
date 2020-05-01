import React, { Component } from 'react';
import AppNav  from './AppNav';
 class Home extends Component {
     state = {  }
     render() { 
         return ( 
             <div style={{backgroundColor: '#f1f1f1'}}>
                <AppNav/>
                 <h2 style = {{display : 'flex', justifyContent :'center', alignItems:'center',height:'100vh'}}>
                     Gérez vos dépenses !
                     </h2>
             </div>
      
            );
     }
 }
  
 export default Home;