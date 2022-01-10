import React from 'react';
import './UserBox.css';

const UserBox = () => {
    return (
        <div className="container mt-4 mb-4 d-flex justify-content-center">
        <div className="card user-card p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> 
            <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" height="100" width="100" /></button> 
            <span className="name mt-3">Isabelle Kenagy</span> <span className="idd">@isaken3</span>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2"> <span className="idd1">Oxc4c16a645_b21a</span> <span><i className="fa fa-copy"></i></span> </div>
                <div className=" d-flex mt-2"> <button className="btn btn-dark">Edit Profile</button> </div>
                <div className="user-text mt-3"> <span>Quidquid latine dictum sit, altum sonatur.</span> </div>
                <div className=" px-2 rounded mt-4 date "> <span className="join">Joined Jan,2022</span> </div>
            </div>
        </div>
    </div>
    );
}

export default UserBox;