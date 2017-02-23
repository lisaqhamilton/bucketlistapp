import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './search-bar';
import VideoDetail from './video-detail';
import ListItem from '../comments/comments';

const API_Key = 'AIzaSyALRyzzDhd0mMr2iTjpNtBmENKC_K6jHxY';

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
		YTSearch({key: API_Key, term: term}, (videos) => {
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
				<ListItem />
			</div>
			);
	}
}

export default Video;