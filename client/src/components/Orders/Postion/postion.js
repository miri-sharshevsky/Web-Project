import React from 'react'
import './postion.css'


export default function Postion({name, price, times}){
    return(<div className = "postion-contaner">
        <p className = "postion-text">{name}</p>
        <p className = "postion-text">{price} ₪ </p>
        <p className = "postion-text1">X</p>
        <p className = "postion-text"> {times}</p>
        <p className = "postion-text"> פעמים</p>

    </div>)
}