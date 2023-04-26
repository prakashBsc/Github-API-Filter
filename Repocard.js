import React from 'react'
import "./Repocard.css";

const Repocard = ({html_url,name,forks,size,created_at}) => {
  return (
    <a href={html_url}
    target="_blank"
    rel="noreferrer" className='Repocard'>
        <h3>{name}</h3>
        <ul>
            <li>size: {size}KB</li>
            <li>forks: {forks}</li>
            <li>created At:{new Date(created_at).toDateString()}</li>
        </ul>
    </a>
  )
}

export default Repocard