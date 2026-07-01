import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NFTCard from "../UI/NFTCard";

const AuthorItems = ({nftCollection,loaded}) => {
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loaded ? (
            nftCollection.map((item) => <NFTCard item={item} key={item.id}/>)
          ) : (
            new Array(8).fill(0).map((_, index) => <NFTCard key={index}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
