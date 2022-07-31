import React from 'react';
import img from './img/PngItem_2550683.png';
import style from './Notfound.module.css'


export default function Notfound() {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={img} alt='404' className={`${style.img404} w-100 py-5`}/>
            </div>
        </div>
    )
}

