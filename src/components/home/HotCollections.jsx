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

  const updateItemsToDisplay = () => {
    if (window.innerWidth <= 1000) {
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

  async function getItems() {
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
          {collections.length > 0 ? (
          <OwlCarousel className='owl-theme' loop items={itemsToDisplay} dots={false} nav>
            {collections.map((item) => (
              collectionHTML(item)
            ))}
          </OwlCarousel>
          ) : (
            null
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
