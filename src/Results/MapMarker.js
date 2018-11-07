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

const ApiKey = "1ef796bdecca4cd3b75dde030b7a2904";
// const ApiKey = "860fb971041b4db8ba24a8ed62426889";
//const ApiKey = "f4ac43e2b5bc4e9ab4d23b6d934fa119";
//const ApiKey = "7137b40da82b459e88fa6cab0058dd54"
//const ApiKey = "a63e4c59d44644838724899d2664e7fd";
//const ApiKey = "c67cca421bab4c51b6817fc5fab880b8";

class MapMarker extends Component {
  state = {
    locationCoord: [],
    isLoaded: false,
    location: this.props.location
  };

  getCoords = async () => {
    this.setState({ isLoaded: false, locationCoord: [0,0] });
    let location = [];

    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${
          this.props.location
        }&key=${ApiKey}&language=en&pretty=1&no_annotations=1`
      )
      .then(geo => {
        location.push(geo.data.results[0].geometry.lat);
        location.push(geo.data.results[0].geometry.lng);
      })
      .then(() => {
        this.setState({
          isLoaded: true,
          locationCoord: location,
          location: this.props.location
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: false,
          locationCoord: []
        });
      });
  };

  componentDidMount() {
    this.getCoords();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.location !== this.props.location) {
      this.getCoords();
    }
  };



  render() {
    const { isLoaded, locationCoord } = this.state;
    const { title } = this.props;
    return (
      <div className="MapMarker">
        {isLoaded && (
          <Marker
            className="Icon"
            position={[locationCoord[0], locationCoord[1]]}
            icon={myIcon}
          >
            <Popup>{title} </Popup>
          </Marker>
        )}
      </div>
    );
  }
}

export default MapMarker;
