import React, {useState, useContext} from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

//Import our Context
import { AuthContext } from '../context/auth';
//Import our Custom Hook
import { useForm } from '../util/hooks';

function Login(props){
    
    const context = useContext(AuthContext)
    
    const navigate = useNavigate()

    //Our Errors State Handler
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: '',
      password: ''
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}){
            //After user is LOGGED IN, we redirect to Home;
            console.log("Redirecting to HomePage after Login...")
            //We give Context the Logged In User
            context.login(userData)
            navigate('/')
        },
        onError(err){
            //The way our server code is written, we give ONE error, which is an object with ALL the errors, so we just wanna access the first one.
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function loginUserCallback(){
      loginUser()
    }

    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    //Line below highlights the error, dynamically. If there is an error in THIS field.
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {/* The Div below, the OUTSIDE Object checks to see if Errors has any keys, because Errors always exists as an empty array.  */}
            {/* The Div below, the INSIDE Object maps through our Errors array, but we only want the values, not the Keys.*/}
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                      {Object.values(errors).map(value => {
                        return <li key={value}>{value}</li>
                      })}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    # Our Mutation asking for its parameters:
    mutation login(
        $username: String!
        $password: String!
    ) {
        # Our register mutation, receiving the values:
        login(
          username: $username
          password: $password
        ){
            # Our Mutation sending back whatever we want from it:
            id email username createdAt token
        }
    }
`

export default Login;