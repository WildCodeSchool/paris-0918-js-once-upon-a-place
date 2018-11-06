import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer} from "react-leaflet";
import MapMarker from './MapMarker';
import logo from "../images/logoCamera.svg";
import axios from "axios";
import 'leaflet/dist/leaflet.css';

import "./Map.css";

// const myIcon = L.icon({
  // iconUrl: logo,
  // iconSize: [40, 50],
  // iconAnchor: [25, 50],
  // popupAnchor: [-3, -42]
// });
// 


class SimpleMap extends Component {
  state = {
    lat: 37.763027,
    lng: -122.487701,
    zoom: 12,

    // movies: '',
    // isLoaded: false,

    // locations: [],
    locationsList: this.props.locationsList
  };

  // componentDidMount = async () => {

  //   console.log(this.props.locationsList)
  //   if (!this.props.locationsList) return
  //   const locations = await this.props.locationsList.map(async e => { 
      
  //     // console.log('lili', e)

  //     let re = /([[:blank]]|(&))/g ; 
  //     /*/(&)|(' ')/ */
  //     let el = e.replace(re, '+');

  //     // console.log(el);

  //     const geo = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${el}+sanfrancisco+us&key=${ApiKey}`);
  //     //console.log("api",geo.data.results[0]);
      
  //     return await {
  //       lat: geo.data.results[0].geometry.lat,
  //       lng: geo.data.results[0].geometry.lng
  //     }

      

  //   });
  //   Promise
  //   .all(locations)
  //   //console.log("1", locations)
  //   .then(locations => {
      
      
  //     this.setState({
  //     isLoaded: true,
  //     locations: locations
  //     })
  //     //, () => console.log("setState", locations))
  //   }
  //   ).catch(function (e) {
  //     console.log(e);
  //   });
  
  // }


  render() {
    const { locationsList } = this.state;
    const position = [this.state.lat, this.state.lng];
    console.log('loca', locationsList)
    // if (!locations) return null;
    return (
      <div className="Map-container">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationsList.length !== 0 && locationsList.map((e,i) => (
              <MapMarker key={i} location={e[0]} title={e[1]}/>
              // <Marker key={i} className="Icon" position={[e.lat, e.lng]} icon={myIcon}>
              //   <Popup>{e[1]} </Popup>
              // </Marker>
            ))}
        </Map>
      </div>
    );
  }
}



export default SimpleMap;
