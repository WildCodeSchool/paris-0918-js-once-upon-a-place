import React from 'react';
// const beginningURL = 'https://image.tmdb.org/t/p/w500'
const Test = props =>{
    console.log('film director', props.result)
    return(
        <div>
            {props.result}
            {/* <img src={beginningURL + props.result.poster_path} alt={props.result.title} />
            {props.result.overview} */}
        </div>

    )
}

export default Test;