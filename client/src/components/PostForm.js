import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function PostForm(){

    const {onChange, onSubmit, values} = useForm(createPostCallback, {
        body: ''
    })

    //Here, we just get errors normally because we only have one error. It's not inside nested Object.
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values, 
        update(proxy, result){
            console.log(result)
            //We put all the Data in Cache, in our data variable down below.
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })

            //So, to update our Posts in Client, we do the lines below. We writeQuery, passing the query and our data, as an object.
            //Line below also persists this. We persist OUR QUERY with the data we got.
            proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        ...data, 
                        getPosts: [result.data.createPost, ...data.getPosts],
                    },
            })
            
            //Line below resets the field after we submit our Post.
            values.body=''
        }
    })

    function createPostCallback(){
        createPost()
    } 

    return(
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create A Post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="FauxBook"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {/* Error handling down below. */}
            {error && (
                <div className='ui error message' style={{marginBottom: 20}}>
                    <ul>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

const CREATE_POST_MUTATION = gql `
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm