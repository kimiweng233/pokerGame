import React from "react";

const Profile = props => {
  let { buttonStyle, pfpStyle, profile, func } = props;

  if (profile.length === 0) {
    return <div className={`plusButton ${buttonStyle}`} onClick={func}></div>
  } else {
    return (<div className={`profile ${pfpStyle}`}>
                <div className="flexcontainer">
                    <h3 className="nameTag">{profile[0]}</h3>
                    <p className="wagerText">wager: {profile[1]}</p>
                </div>
            </div>);
  }
};

export default Profile;