import Sidebar from "../../components/Sidebar/Sidebar"; 
 import SinglePost from "../../components/Singlepost/Singlepost"; 
 import "./Single.css"; 
  import React from 'react';
 export default function Single() { 
   return ( 
     <div className="single"> 
       <SinglePost /> 
       <Sidebar /> 
     </div> 
   ); 
 }