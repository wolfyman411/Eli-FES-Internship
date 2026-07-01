import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Timer from '../UI/Timer'
import NFTCard from "../UI/NFTCard";

const NewItems = () => {

  const [items,setItems] = useState([])
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
    if (items.length > 0) {
      setLoaded(true)
    }
  },[items])

  async function getItems() {
    setLoaded(false)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setItems(data)
  }

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-in" data-aos-delay="500" data-aos-duration="1000">
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
              items.map((item) => <NFTCard item={item} caro={true} key={item.id}/>)
            ) : (
              new Array(8).fill(0).map((_, index) => <NFTCard key={index} caro={true}/>)
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
