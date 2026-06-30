import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {

  const [collections,setCollections] = useState([])
  const [itemsToDisplay, setItemsToDisplay] = useState(4);
  const [loaded,setLoaded] = useState(false)

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
    if (collections.length > 0) {
      setLoaded(true)
    }
  },[collections])

  async function getItems() {
    setLoaded(false)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
  }

  function collectionHTML(item) {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={item.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={item.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{item.title}</h4>
            </Link>
            <span>ERC-{item.code}</span>
          </div>
        </div>
      </div>
    )
  }

  function lazyHTML(index) {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <div className="skeleton-box" style={{width:"100%", height:"100%"}}></div>
          </div>
          <div className="nft_coll_pp">
            <div className="skeleton-box" style={{padding:"32px 32px", borderRadius:"50%"}}></div>
            <i className="fa fa-square"></i>
          </div>
          <div className="nft_coll_info">
            <div className="skeleton-box" style={{width:"40%", padding:"12px 0px", display:"block", margin:"12px auto"}}></div>
            <div className="skeleton-box" style={{width:"30%", padding:"12px 0px", display:"block", margin:"0 auto"}}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel key={loaded} className='owl-theme' loop items={itemsToDisplay} dots={false} nav>
            {loaded ? (
              collections.map((item) => collectionHTML(item))
            ) : (
              new Array(8).fill(0).map((_, index) => lazyHTML(index))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
