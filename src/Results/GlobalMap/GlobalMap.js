import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import FilmingLocation from './FilmingLocation';
import dataWithGeo from './data-with-geo';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from './MarkerClusterGroup';
import './GlobalMap.css';

const GEO_SAN_FRANSISCO = [37.77492, -122.41941]
const MASK_GEO_LIMIT_LATITUD = 1;
const MASK_GEO_LIMIT_LONGITUD = 1;

const ZOOM = 12;

const maskGeo = (array) => {
  if(
    array.geo[1] < (Math.trunc(GEO_SAN_FRANSISCO[1] * 10) / 10) + MASK_GEO_LIMIT_LONGITUD / 2
    && array.geo[1] > (Math.trunc(GEO_SAN_FRANSISCO[1] * 10) / 10) - MASK_GEO_LIMIT_LONGITUD / 2
    && array.geo[0] < (Math.trunc(GEO_SAN_FRANSISCO[0] * 10) / 10) + MASK_GEO_LIMIT_LATITUD / 2
    && array.geo[0] > (Math.trunc(GEO_SAN_FRANSISCO[0] * 10) / 10) - MASK_GEO_LIMIT_LATITUD / 2
  )
  return array;
}

const handleClickCircle = () => {
    console.log("handleClickCircle");
}

const handleMap = (event) => {
    console.log("handleMap: ", event.latlng);
}

export default () => {
    console.log("render big map");
        
    return (
        <Map 
          className="leaflet-container" 
          center={GEO_SAN_FRANSISCO} 
          zoom={ZOOM}
          onClick={handleMap}
          maxZoom={20}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup showCoverageOnHover={false}>
            {dataWithGeo.slice(0, 1000).filter(f => maskGeo(f)).map((e, i) =>
              <FilmingLocation
                key={i}
                mark={e}
              ></FilmingLocation>       
            )}
          </MarkerClusterGroup>

        </Map>
    )
}