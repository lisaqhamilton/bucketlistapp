import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS } from './types';
import authReducer from '../reducers/auth_reducer';

// export const CREATE_POSTS = 'CREATE_POSTS';
// const ROOT_URL = 'http://rest.learncode.academy/api/lisabucketlist';
const ROOT_URL = 'http://localhost:3000';

const config = {
	headers: { authorization: localStorage.getItem('token') } 
}
export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
		.then(response => {
			//This only kickstarts if the request was good...
			//We now update the state to indicate authenticated user
			dispatch({ type: AUTH_USER });
			//This will put the token in localStorage. It's safe!!
			localStorage.setItem('token', response.data.token);
			//This sends us off to the /newitem view
			browserHistory.push('/newitem');
		})
		.catch(response => dispatch(authError("Go find that paper with all your passwords cause that one isn't right")));
	 }
}

//pupose of type is to catch unauth_user case
//flips auth fag to false & there won't be any links associated with them
//other thing to do is get rid of token
export function signoutUser() {
	localStorage.removeItem('token');
		return {type: UNAUTH_USER};
}

export function signupUser({email, password}) {
	return function(dispatch) {
		//Submit email/password to the server
		axios.post(`${ROOT_URL}/signup`, {email, password})
		.then(response => {
			dispatch({type: AUTH_USER});

			//update the token
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/newitem');
		})
		.catch(response => dispatch(authError(response.data.error)));
	}
} 
export function createPost(props) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/newitem`, { props }, config)
		.then(request => {
			dispatch({
				type: CREATE_POSTS,
				payload: request
			});
			browserHistory.push('/newitem');
		});
	}
}
export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}