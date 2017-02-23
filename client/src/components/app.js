import React from 'react';
import { Component } from 'react';
import NavBarHeader from './Nav';
import Video from './video/video';
import SearchBar from './video/search-bar';
// import ListItem from './components/comments/comments';
// import CommentBox from './components/comments/comments';
// import reduxForm from './auth/signin';

	export default class App extends Component {
		render() {
			return (
				<div>
					<NavBarHeader />
					{this.props.children}
					<Video />
					
					
				</div>
				);
		}
	}