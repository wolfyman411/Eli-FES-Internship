import React from 'react'
import { Link } from "react-router-dom";
import Timer from './Timer';


export default function NFTCard({item,caro=false,index}) {

  // This is needed because styling gets messed up when placed within a carousel
  const styleClass = caro ? "col-lg-12 col-md-12 col-sm-12 col-xs-12" : "col-lg-3 col-md-6 col-sm-6 col-xs-12"

  function cardHTML() {
    return(
        <div
            key={item.id}
            className={"d-item "+styleClass}
            style={{ display: "block", backgroundSize: "cover" }}
        >
            <div className="nft__item">
            <div className="author_list_pp">
                <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
                </Link>
            </div>
            <Timer expireTime={item.expiryDate}/>

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
                <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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

  function skeletonHTML() {

    return(
    <div className={styleClass} key={index}>
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
    item ? cardHTML() : skeletonHTML()
  )
}
