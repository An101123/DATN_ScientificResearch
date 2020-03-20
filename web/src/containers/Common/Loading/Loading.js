import React from 'react';
import './Loading.css';
import loadingImg from "../../../assets/img/loading.gif"; 

export default function () {
  return (
    <div className="Loading">
      <img alt="Base coreUI reactjs redux saga" src={loadingImg}/>
    </div>
  );
}