import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

import logo from "../images/logoCamera.svg";

const myIcon = L.icon({
  iconUrl: logo,
  iconSize: [40, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -42]
});

//const ApiKey = "a63e4c59d44644838724899d2664e7fd";
const ApiKey = "c67cca421bab4c51b6817fc5fab880b8";

class MapMarker extends Component {
  state = {
    locationCoord: [],
    isLoaded: false
  };

  componentDidMount = async () => {
    let location = [];

    // let re = /([[:blank]]|(&))/g ; 
  //     /*/(&)|(' ')/ */
    let el = this.props.location.replace( ' & ', ' ');

    console.log(el)

    // let re = / & /g;
    // let el = this.props.location.replace(re, "%20");
    // re = / /g;
    // el = el.replace(re, "%20");
    // console.log(el)

    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${el}+sanfrancisco+us&key=${ApiKey}`
      )
      .then(geo => {
        location.push(geo.data.results[0].geometry.lat);
        location.push(geo.data.results[0].geometry.lng);
      })
      .then(() => {
        this.setState({
          isLoaded: true,
          locationCoord: location
        });
      })
      .catch(

      );
  };

  render() {
    const { isLoaded, locationCoord } = this.state;
    return (
      <div className="MapMarker">
        {isLoaded && (
          <Marker
            className="Icon"
            position={[locationCoord[0], locationCoord[1]]}
            icon={myIcon}
          >
            <Popup>{this.props.title} </Popup>
          </Marker>
        )}
      </div>
    );
  }
}

export default MapMarker;
