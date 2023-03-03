import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from 'graphql-tag'
import { Button, Icon, Label } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";

function LikeButton({user, post: {id, likeCount, likes}}){

    const [liked, setLiked]= useState(false)
 
    useEffect(() => {
        //If any of the Likes on this post, has a username of THIS user, then the user we're logged in AS, has liked this post.
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])
    //Line above is the dependancies array, if any of these values change, re-render and re-calculate the value.

    // This useMutation gets called from our onClick.
    // It takes the MUTATION we created down below and the postID from the Prps coming from the Parent Component <PostCard/>.
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    const likeButton = user ? (
        liked ? (

            <Button color='teal'>
                <Icon name='heart'/>
            </Button>

        ) : (

            <Button color='teal' basic>
                <Icon name='heart'/>
            </Button>
        )

        ) : (

            <Button as={Link} to="/login" color='teal' basic>
                <Icon name='heart'/>
            </Button>

    )

    return(
        <Button as='div' labelPosition='right' onClick={likePost}>
            {/* Like Button is dynamically rendered based on our loic from above */}
            {/* {likeButton} */}
            <MyPopup content={liked ? 'Unlike' : 'Like'}>
                {likeButton}
            </MyPopup>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )

}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton