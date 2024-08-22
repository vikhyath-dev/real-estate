import { Link } from 'react-router-dom'
import './card.scss'
import React from 'react'

export default function Card({item}) {
  return (
    <div className="card">
      <Link to={`/$item.id`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/icons8-pin-100.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">{item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/icons8-bed-100.png" alt="bed" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/icons8-bath-100.png" alt="bath" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/icons8-save-100.png" alt="save" />
            </div>
            <div className="icon">
              <img src="/icons8-chat-64.png" alt="chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
