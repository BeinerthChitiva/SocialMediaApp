import React, { useContext } from 'react'
import { Card, Image, Button, Label, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';


function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}){

    const { user } = useContext(AuthContext)

    return(
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <LikeButton user={user} post={{id, likes, likeCount}}/>

            <MyPopup content="Comment on post" >
            {/* <Button as='div' labelPosition='right' onClick={commentOnPost}> */}
              <Link to={`/posts/${id}`}>
                  <Button as='div' labelPosition='right'>
                      {/* Adding basic to the line below, makes it into an outline. */}
                      <Button color='blue' basic>
                          <Icon name='comments' />
                          {/* Comment */}
                      </Button>
                      <Label basic color='blue' pointing='left'>
                          {commentCount}
                      </Label>
                  </Button>
              </Link>
            </MyPopup>
            {/* Dynamically render Delete Button. */}
            {user && user.username === username && <DeleteButton postId={id}/>}
        </Card.Content>
      </Card>
    )
}

export default PostCard;




















//////////v1 of the code, before we took Like Button to its own Component.

// import React, { useContext } from 'react'
// import { Card, Image, Button, Label, Icon} from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// import { AuthContext } from '../context/auth';

// function likePost(){
//     console.log("Post liked from button! :D")
// }
// // function commentOnPost(){
// //     console.log("Comment On Post. :D")
// // }


// //We receive XXX from props, so we just destructure it immediately.
// function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}){

//     const { user } = useContext(AuthContext)

//     return(
//         <Card fluid>
//         <Card.Content>
//           <Image
//             floated='right'
//             size='mini'
//             src='https://react.semantic-ui.com/images/avatar/large/molly.png'
//           />
//           <Card.Header>{username}</Card.Header>
//           {/* In line below, he added true to .fromNow to get rid of "2 days AGO", but I like it, so I won't take it off. */}
//           <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
//           <Card.Description>
//             {body}
//           </Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//             <Button as='div' labelPosition='right' onClick={likePost}>
//                 {/* Adding basic to the line below, makes it into an outline. */}
//                 <Button color='teal' basic>
//                     <Icon name='heart' />
//                     {/* Like */}
//                 </Button>
//                 <Label basic color='teal' pointing='left'>
//                     {likeCount}
//                 </Label>
//             </Button>
            
//             {/* <Button as='div' labelPosition='right' onClick={commentOnPost}> */}
//             <Link to={`/posts/${id}`}>
//                 <Button as='div' labelPosition='right'>
//                     {/* Adding basic to the line below, makes it into an outline. */}
//                     <Button color='blue' basic>
//                         <Icon name='comments' />
//                         {/* Comment */}
//                     </Button>
//                     <Label basic color='blue' pointing='left'>
//                         {commentCount}
//                     </Label>
//                 </Button>
//             </Link>
//             {/* sasa */}
//             {user && user.username === username && (
//                 <Button
//                     // style={{maxWidth: 10}}
//                     as="div"
//                     color="red"
//                     floated='right'
//                     onClick={() => console.log("Delete Post Function.")}>

//                     <Icon name="trash" style={{margin: 0}}/>

//                 </Button>
//             )}
//         </Card.Content>
//       </Card>
//     )
// }

// export default PostCard;

///////////////////V2, BEFORE REMOVIND DELETE BUTTON TO CREATE CUSTONM COMPONENT
// import React, { useContext } from 'react'
// import { Card, Image, Button, Label, Icon} from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// import { AuthContext } from '../context/auth';
// import LikeButton from './LikeButton';

// // function likePost(){
// //     console.log("Post liked from button! :D")
// // }
// // function commentOnPost(){
// //     console.log("Comment On Post. :D")
// // }


// //We receive XXX from props, so we just destructure it immediately.
// function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}){

//     const { user } = useContext(AuthContext)

//     return(
//         <Card fluid>
//         <Card.Content>
//           <Image
//             floated='right'
//             size='mini'
//             src='https://react.semantic-ui.com/images/avatar/large/molly.png'
//           />
//           <Card.Header>{username}</Card.Header>
//           {/* In line below, he added true to .fromNow to get rid of "2 days AGO", but I like it, so I won't take it off. */}
//           <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
//           <Card.Description>
//             {body}
//           </Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//             {/* LIKE BUTTON TAKEN TO ITS OWN COMPONENT. SO NO WE PUTTING DOWN OUR CUSTOM COMPONENT. */}
//             {/* Our Custom component we're prop drilling User one level so it's aight, and the post. */}
//             <LikeButton user={user} post={{id, likes, likeCount}}/>
            
//             {/* <Button as='div' labelPosition='right' onClick={commentOnPost}> */}
//             <Link to={`/posts/${id}`}>
//                 <Button as='div' labelPosition='right'>
//                     {/* Adding basic to the line below, makes it into an outline. */}
//                     <Button color='blue' basic>
//                         <Icon name='comments' />
//                         {/* Comment */}
//                     </Button>
//                     <Label basic color='blue' pointing='left'>
//                         {commentCount}
//                     </Label>
//                 </Button>
//             </Link>
//             {/* Dynamically render Delete Button. */}
//             {user && user.username === username && (
//                 <Button
//                     // style={{maxWidth: 10}}
//                     as="div"
//                     color="red"
//                     floated='right'
//                     onClick={() => console.log("Delete Post Function.")}>

//                     <Icon name="trash" style={{margin: 0}}/>

//                 </Button>
//             )}
//         </Card.Content>
//       </Card>
//     )
// }

// export default PostCard;