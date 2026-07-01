import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {

  const [items,setItems] = useState([])
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
      getItems()
    },[])
  
  useEffect(() => {
    if (items.length > 0) {
      setLoaded(true)
    }
  },[items])

  async function getItems() {
    setLoaded(false)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setItems(data)
  }

  function skeletonHTML(index) {
    return(null)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loaded ? (
        items.map((item) => <NFTCard item={item}/>)
      ) : (
        new Array(8).fill(0).map((_, index) => <NFTCard index={index}/>)
      )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
