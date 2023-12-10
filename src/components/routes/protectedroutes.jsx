import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const protectedroutes = (props) => {
    const navigate = useNavigate();

    const {Component} =props;
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/');

    }})
  return (
    <div>
        <Component></Component>
    </div>
  )
}

export default protectedroutes