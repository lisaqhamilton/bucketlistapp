import React from 'react';
import { Component } from 'react';
import NavBarHeader from './Nav';
import Video from './video/video';
import SearchBar from './video/search-bar';


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