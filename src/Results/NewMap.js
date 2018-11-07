import React, { Component } from 'react';

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

class NewMap extends Component{
    state = {
        lat: 37.763027,
        lng: -122.487701,
        zoom: 12,
      };
    render(){
        const position = [this.state.lat, this.state.lng];
        return(
          <div className="Map-container">
            <Map className="map" center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
          </div>

        )
    }
}

export default NewMap;