import _ from 'lodash';
import React from 'react';
import { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './search-bar';
import VideoDetail from './video-detail';

const API_KEY = 'AIzaSyCNSGt1YR8IjmbM8KpNaaviLKqQ9C59T6M';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('bucketlist');
	}
	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render() {
		const videoSearch = _.debounce((term)=>{ this.videoSearch(term) }, 300);
		return (
			<div>
				<SearchBar on SearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
			</div>
			);
	}
}

export default Video;