import React, {useState} from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm} from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({postId, commentId, callback}){

    const [confirmOpen, setConfirmOpen] = useState(false)

    //If we wanna DELETECOMMENT, we pass a PostId && CommentId. If we want to DELETEPOST, we only pass PostId and the Callback.
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            //Once we reach here, it means Post has been deleted succesfully. So we wanna CLOSE the modal.
            setConfirmOpen(false)

            //If there's no commentId, just delete Post.
            if(!commentId){
                //Remove Post from Cache, to update FrontEnd.
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(post => post.id !== postId)
                    }
                })
            }

            //Line below, just callsback the Callback Function to redirect us home, after deleting.
            if (callback) callback()
        },
        variables: {
            postId,
            commentId
        }
    })

    return(
        <>
        <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
            <Button
                as="div"
                color="red"
                floated='right'
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{margin: 0}}/>
            </Button>
        </MyPopup>
        <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePostOrMutation}
        />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton