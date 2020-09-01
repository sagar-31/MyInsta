import React from 'react';
import './post.css';
import logo from './logo.png';
import Avatar from '@material-ui/core/Avatar'

function post({username,caption,imageUrl}) {
    return (
        <div className='post'>
        <div className='post_header'>
        <Avatar
        className='post_avatar'
        src={imageUrl}
        alt='sagar' />
        <h3>{username}</h3>
        </div>
        <img src={imageUrl} className='post_image' alt='postImg' />
        <h4 className='post_text'><strong>{username} :</strong>{caption}</h4>
        </div>
    )
}

export default post
