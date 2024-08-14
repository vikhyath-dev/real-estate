import React from 'react'
import './pin.scss'
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


export default function Pin({item}) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
              <div className="popupContainer">
                  <img src={item.img} alt="" />
                  <div className="textContainer">
                      <Link to={`/${item.id}`}>{item.title}</Link>
                      <span className='bed'>{item.bedroom} bedroom</span>
                      <b>$ {item.price}</b>
                  </div>
       </div>
      </Popup>
    </Marker>
  );
}
