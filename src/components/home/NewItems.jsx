import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const NewItems = () => {

  const [items,setItems] = useState([])
  const [itemsToDisplay, setItemsToDisplay] = useState(4);
  const [loaded,setLoaded] = useState(false)
  const currentTime = useRef(Date.now())
  
  const updateItemsToDisplay = () => {
    if (window.innerWidth <= 600) {
      setItemsToDisplay(1);
    } else if (window.innerWidth <= 1000) {
      setItemsToDisplay(2);
    } else {
      setItemsToDisplay(4);
    }
  };

  useEffect(() => {
    updateItemsToDisplay();
    window.addEventListener('resize', updateItemsToDisplay);
    getItems()
  },[])

  useEffect(() => {
    if (items.length > 0) {
      setLoaded(true)
    }
  },[items])

  useEffect(() => {
    const interval = setInterval(() => {
      currentTime.current = Date.now()
    }, 1000)
  },[])

  async function getItems() {
    setLoaded(false)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setItems(data)
  }

  function timerHTML(expireTime) {

    function displayTime(expireTime) {
      const mili = expireTime - currentTime

      if (mili > 0) {
        const seconds = Math.floor(mili/1000)
        const minutes = Math.floor(seconds/60)
        const hours = Math.floor(minutes/60)
        return `${hours.toString()}h ${minutes.toString()%60}m ${(seconds%60).toString()}s`
      }
      return null
    }

    return (
      <div className="de_countdown">{displayTime(expireTime)}</div>
    )
  }

  function itemHTML(item) {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {timerHTML(item.expiryDate)}

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Link to="/item-details">
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{item.title}</h4>
            </Link>
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function skeletonHTML(index) {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <div className="skeleton-box" style={{padding:"32px 32px", borderRadius:"50%"}}></div>
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="de_countdown">5h 30m 32s</div>

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="skeleton-box" style={{width:"100%", height:"80%"}}></div>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <div className="skeleton-box" style={{width:"60%", padding:"12px 24px", top:"-24px", display:"block"}}></div>
              <div className="skeleton-box" style={{width:"40%", padding:"12px 24px", top:"-16px", display:"block"}}></div>
            </Link>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel key={loaded} className='owl-theme' loop items={itemsToDisplay} dots={false} nav>
            {loaded ? (
              items.map((item) => itemHTML(item))
            ) : (
              new Array(8).fill(0).map((_, index) => skeletonHTML(index))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
