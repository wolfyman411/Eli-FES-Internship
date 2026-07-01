import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [topSellers,setTopSellers] = useState([])
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    getTopSellers()
  },[])

  useEffect(() => {
    if (topSellers.length > 0) {
      setLoaded(true)
    }
  },[topSellers])

  async function getTopSellers() {
    setLoaded(false)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setTopSellers(data)
  }

  function topSellerHTML(data) {
    return (
    <li key={data.id}>
      <div className="author_list_pp">
        <Link to={`/author/${data.authorId}`}>
          <img
            className="lazy pp-author"
            src={data.authorImage}
            alt=""
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to="/author">{data.authorName}</Link>
        <span>{data.price} ETH</span>
      </div>
    </li>
    )
  }

  function skeletonHTML(index) {
    return(
      <li key={index}>
        <div className="author_list_pp">
          <div className="skeleton-box" style={{padding:"24px 24px", borderRadius:"50%"}}></div>
          <i className="fa fa-check"></i>
        </div>
        <div className="author_list_info">
          <div className="skeleton-box" style={{width:"60%", padding:"6px 12px", top:"4px", display:"block"}}></div>
          <div className="skeleton-box" style={{width:"40%", padding:"6px 12px", top:"8px", display:"block"}}></div>
        </div>
      </li>
    )
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loaded ? (
                topSellers.map((item) => topSellerHTML(item))
              ) : (
                new Array(12).fill(0).map((_, index) => skeletonHTML(index))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
