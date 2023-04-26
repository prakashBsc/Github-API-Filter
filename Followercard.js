import React from "react";
import "./Followercard.css";

const Followercard = ({avatar_url, html_url,login}) => {
  return (
    <a 
      href={html_url} 
      target="_blank"
       rel="noreferrer" 
       className="followercard">
      <div>
        <img src={avatar_url} alt=""/>
      </div>
      <div>
        <h2>username: {login}</h2>
      </div>
    </a>
  );
  
};

export default Followercard;