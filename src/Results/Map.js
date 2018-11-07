import React, { Component } from "react";
import { Map, TileLayer} from "react-leaflet";
import MapMarker from './MapMarker';
import 'leaflet/dist/leaflet.css';

import "./Map.css";



class SimpleMap extends Component {
  state = {
    lat: 37.763027,
    lng: -122.487701,
    zoom: 12,
  };

  render() {
    const { locationsList } = this.props;
    const position = [this.state.lat, this.state.lng];
    console.log('loc', locationsList)
    return (
      <div className="Map-container">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationsList && locationsList.map((e,i) => (
              <MapMarker key={i} location={e[0]} title={e[1]}/>
            ))}
        </Map>
      </div>
    );
  }
}



export default SimpleMap;
