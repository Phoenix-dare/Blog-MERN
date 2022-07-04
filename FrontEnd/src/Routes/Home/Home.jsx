import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Header from "../../components/Header/Header"; 
 import Posts from "../../components/Posts/Posts"; 
 import Sidebar from "../../components/Sidebar/Sidebar"; 
import "./Home.css"; 
import axios from "axios";

 export default function Home() { 
   const [posts, setPosts] = useState([]); 
   const { search } = useLocation(); 
  
   useEffect(() => { 
     const fetchPosts = async () => { 
       const res = await axios.get("https://blog-backend2.saraths10.repl.co/post" + search); 
       setPosts(res.data); 
     }; 
     fetchPosts(); 
   }, [search]); 
   return ( 
     <> 
       <Header /> 
       <div className="home"> 
          <Sidebar className="categories" /> 
         <Posts className="posts"posts={posts} /> 
         
        </div> 
     </> 
   ); 
 }