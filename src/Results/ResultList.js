import React, {Component} from 'react';
import Expander from './Expander';
import './ResultList.css';

class ResultList extends Component {

    transformDatasLocationInMovie = datas => {
        let res = [];
        datas.map(data => {

            const film = res.filter(f => f.title === data.title && f.release_year === data.release_year);
            if (!film.length) {
                const add = {};
                add.title = data.title;
                add.release_year = data.release_year;
                add.locations = new Array(data.locations)
                add.synopsis = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                add.shortSynopsis = add.synopsis.substring(0, 110) + '...'
                res.push(add);
            } else {
                res.filter(f => f.title === data.title && f.release_year === data.release_year)[0].locations.push(data.locations);
            }

        })
        return res;
    };

    render() {
        let datas = this.transformDatasLocationInMovie(this.props.locationsList);
        // console.log("resultList", datas);
        return (
            <div className='cardContainer'>{
                datas.map(e => {
                    //return <p>Resultat: {e.title}</p>
                    return (
                        <div className='card'>
                            
                            <Expander movie = {e}/>
                        </div>
                    )
                })
            }</div>
        )
    }
}

export default ResultList;


//<MediaCard locationMovie= {e}/>