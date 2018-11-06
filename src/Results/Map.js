import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import logo from "../images/logoCamera.svg";
import axios from "axios";

import "./Map.css";

const myIcon = L.icon({
  iconUrl: logo,
  iconSize: [40, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -42]
});

const ApiKey = "a63e4c59d44644838724899d2664e7fd";
//const ApiKey = "c67cca421bab4c51b6817fc5fab880b8";

class SimpleMap extends Component {
  state = {
    lat: 37.763027,
    lng: -122.487701,
    zoom: 12,

    movies: '',
    isLoaded: false,

    locations: []
  };

  componentDidMount = async () => {

    
    if (!this.props.moviesList[0] && !this.props.moviesList[0].locations) return
    const locations = await this.props.moviesList[0].locations.map(async e => { 
      
      // console.log('lili', e)

      let re = /([[:blank]]|(&))/g ; 
      /*/(&)|(' ')/ */
      let el = e.replace(re, '+');

      // console.log(el);

      const geo = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${el}+sanfrancisco+us&key=${ApiKey}`);
      //console.log("api",geo.data.results[0]);
      
      return await {
        lat: geo.data.results[0].geometry.lat,
        lng: geo.data.results[0].geometry.lng
      }

      

    });
    Promise
    .all(locations)
    //console.log("1", locations)
    .then(locations => {
      
      
      this.setState({
      isLoaded: true,
      locations: locations
      })
      //, () => console.log("setState", locations))
    }
    ).catch(function (e) {
      console.log(e);
    });
  
  }


  render() {
    const { isLoaded, locations } = this.state;
    const position = [this.state.lat, this.state.lng];
    if (!locations) return null;
    return (
      <div className="Map-container">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {isLoaded && locations.map((e,i) => (
              <Marker key={i} className="Icon" position={[e.lat, e.lng]} icon={myIcon}>
                <Popup>{this.props.moviesList[0].title} ({this.props.moviesList[0].release_year})</Popup>
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}



export default SimpleMap;
