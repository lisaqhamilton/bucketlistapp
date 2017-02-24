import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import authReducer from '../reducers/auth_reducer';

export const CREATE_POSTS = 'CREATE_POSTS';
// const ROOT_URL = 'http://rest.learncode.academy/api/lisabucketlist';
const ROOT_URL = 'http://localhost:3000';

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
export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}
// export function createPost(props) {
// 	const request = axios.post(`${ROOT_URL}/posts`, props);
// 	return {
// 		type: CREATE_POSTS,
// 		payload: request
// 	};
// }