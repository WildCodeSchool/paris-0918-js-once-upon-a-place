import React, { Component, Fragment } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Axios from 'axios';
import icon from './icon.png';

const myIcon = L.icon({
    iconUrl: icon,
    // iconSize: [40, 50],
    iconSize: [50, 50],
    // iconAnchor: [30, 50],
    iconAnchor: [30, 50],
    // popupAnchor: [-3, -76],
    popupAnchor: [-3, -76]
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });

class FilmingLocation extends Component {

    state = {
        location: this.props.mark.location,
        movies : []
    };

    handleMarker = () => {
        if (this.state.movies.length)
            return;

        Axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?$where=locations = '${this.state.location}'`)
        .then((response) => {
            const movies = response.data.map(e => {
                let add = {};
                add.title = e.title;
                add.release_year = e.release_year;
                return add;
            })
            this.setState({
                movies : movies
            });
        });
    }

    render() {
        const { geo: position, location } = this.props.mark;
        return (
            <Fragment>
                <Marker 
                    position={position} 
                    icon={myIcon}
                    onClick={this.handleMarker}
                >
                    <Popup>
                        <b>{location}</b>
                        {(this.state.movies.length !== 0) && 
                            <ul> 
                                {this.state.movies.sort((a, b) => ('' + a.title).localeCompare(b.title)).map((movie, index) => (
                                    <li key={index}>{`${movie.title} (${movie.release_year})`}</li> 
                                ))}
                            </ul>
                        }
                    </Popup>
                </Marker>  
            </Fragment>
        )
    }
}

export default FilmingLocation;
