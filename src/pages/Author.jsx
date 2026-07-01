import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {

  const {id} = useParams()
  const [userData,setUserData] = useState({})
  const [loaded,setLoaded] = useState(false)
  const [following,setFollowing] = useState(false)

  useEffect(() => {
      getUserData()
    },[])
  
  useEffect(() => {
    if (userData.id) {
      setLoaded(true)
    }
  },[userData])

  async function getUserData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)

    // Add author image to data
    for (let item of data.nftCollection) {
      item.authorImage = data.authorImage
    }

    setUserData(data)
  }

  function authorHTML() {
    return(
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <img src={userData.authorImage} alt="" />

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  {userData.authorName}
                  <span className="profile_username">{userData.tag}</span>
                  <span id="wallet" className="profile_wallet">
                    {userData.address}
                  </span>
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </h4>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower">{userData.followers+following} followers</div>
              <Link to="#" className="btn-main" onClick={() => setFollowing(!following)}>
                {following ? "Following" : "Follow"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function skeletonHTML() {
    return (
    <div className="col-md-12">
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <div className="skeleton-box" style={{padding:"64px 64px", borderRadius:"50%"}}></div>

            <div className="profile_name">
              <h4>
                <div className="skeleton-box" style={{width:"200px", display:"block"}}></div>
                <div className="skeleton-box" style={{width:"120px", height:"16px", top:"4px", display:"block"}}></div>
                <span id="wallet" className="profile_wallet">
                  <div className="skeleton-box" style={{width:"200px", height:"24px", top:"8px", display:"block"}}></div>
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <div className="profile_follower"></div>
            <Link to="#" className="btn-main" onClick={() => setFollowing(!following)}>
              Follow
            </Link>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loaded ? authorHTML() : skeletonHTML()}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={userData.nftCollection} loaded={loaded} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
