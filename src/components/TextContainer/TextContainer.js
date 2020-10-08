import React from 'react';
import './TextContainer.css'

const TextContainer = ({users})=>(
    <div className="textContainer" >
    <div>
    <h1>Real ttime chat application <span role="img" aria-label="emoji"></span> </h1>
    
    </div>
    {
        users
        ?(
            <div> <h1>People Caurreently Chating:</h1>
            <div className="activeContainer"> <h2>{users.map(({name})=>(
                <div key={name} className="activeItem">{name}</div>
            ))}</h2></div></div>
        ): null
    } 
      </div>
)
export default TextContainer;