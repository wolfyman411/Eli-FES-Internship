import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {

  const [items,setItems] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [displayItems,setDisplayItems] = useState(8)
  const [filter,setFilter] = useState("")

  useEffect(() => {
      getItems()
    },[])
  
  useEffect(() => {
    if (items.length > 0) {
      setLoaded(true)
    }
  },[items])

  useEffect(() => {
    getItems()
  },[filter])

  async function getItems() {
    setLoaded(false)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
    setItems(data)
  }

  function displayMore() {
    setDisplayItems((prev) => prev + 4)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loaded ? (
        items.map((item) => <NFTCard item={item} key={item.id}/>).slice(0,displayItems)
      ) : (
        new Array(8).fill(0).map((_, index) => <NFTCard key={index}/>)
      )}
      {displayItems < items.length && (
        <div className="col-md-12 text-center" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          <Link to="" id="loadmore" className="btn-main lead" onClick={displayMore}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
