'use strict';


//const React = require('react');
import React from 'react';
//const ReactDOM = require('react-dom');
import ReactDOM from 'react-dom';
//const when = require('when');
import when from 'when';
//const client = require('./client');
import client from './client';
//import { NavBar } from './NavBar';
//const follow = require('./follow'); // function to hop multiple links by "rel"
import follow from './follow';
//const stompClient = require('./websocket-listener');
import stompClient from './websocket-listener';
//const root = '/api';


const root = '/api/songs/search';
//const root = '/api/songs';


class SongInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {songs: [], cellSelected: [], attributes: [], sortBy: "songindex,desc", searchBy:'findBySongindex', page: 1, songindex: this.props.songId, itemtext: this.props.songId, itemTextInput: this.props.songId, pageSize: 8, sort:"songindex,desc", links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
		console.log("SongA: constructor" );
	}

	loadFromServer(itemTextUpdate, pageSize, pageSortUpdate) {
		follow(client, root, [
				{rel: this.state.searchBy, params: {size: pageSize, sort:pageSortUpdate, item:this.props.itemParameter, songindex: itemTextUpdate}}] //itemText}}]
	//			{rel: this.state.searchBy, params: {size: pageSize, sort:pageSort, songindex: songindex}}]
	).then(songCollection => {
				return client({
					method: 'GET',
					path: "api/profile/songs",
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					this.schema = schema.entity;
					this.links = songCollection.entity._links;
					return songCollection;
				});
		}).then(songCollection => {
			this.page = songCollection.entity.page;
			return songCollection.entity._embedded.songs.map(song =>
					client({
						method: 'GET',
						path: song._links.self.href
					})
			);
		}).then(songPromises => {
			return when.all(songPromises);
		}).done(songs => {
			this.setState({
				page: this.page,
				songs: songs,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				sort: pageSortUpdate,
				songindex: itemTextUpdate,
				links: this.links
			});
//			console.log("props.songs[0].entity.itemtext = " + this.props.songs[0].entity.itemtext);
		});
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(songCollection => {
			this.links = songCollection.entity._links;
			this.page = songCollection.entity.page;

			return songCollection.entity._embedded.songs.map(song =>
					client({
						method: 'GET',
						path: song._links.self.href
					})
			);
		}).then(songPromises => {
			return when.all(songPromises);
		}).done(songs => {
			this.setState({
				page: this.page,
				songs: songs,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				itemTextInput: this.state.itemTextInput,
				links: this.links
			});
		});
	}

	updatePageSize(itemTextUpdate, pageSizeUpdate, pageSortUpdate, searchByUpdate) {
			this.loadFromServer(itemTextUpdate, pageSizeUpdate, pageSortUpdate);
	}
	// tag::websocket-handl</td>ers[]
	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'songs',
			params: {size: this.state.pageSize, songindex: this.state.itemTextInput}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		})
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'songs',
			params: {
				size: this.state.pageSize,
				songindex: this.state.itemTextInput,
				page: this.state.page.number
			}
		}]).then(songCollection => {
			this.links = songCollection.entity._links;
			this.page = songCollection.entity.page;

			return songCollection.entity._embedded.songs.map(song => {
				return client({
					method: 'GET',
					path: song._links.self.href
				})
			});
		}).then(songPromises => {
			return when.all(songPromises);
		}).then(songs => {
			this.setState({
				page: this.page,
				songs: songs,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				songindex: this.state.itemTextInput,
				links: this.links
			});

		});
	}

	// end::websocket-handlers[]
	// tag::register-handlers[]
	componentDidMount() {
		this.loadFromServer(this.state.itemTextInput, this.state.pageSize, this.state.sortBy);
		stompClient.register([
			{route: '/topic/newSong', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateSong', callback: this.refreshCurrentPage},
			{route: '/topic/deleteSong', callback: this.refreshCurrentPage}
		]);
	}


	render() {
		return (

			<SongList page={this.state.page}
							songId={this.props.songID}
							arrangement={this.props.arrangement}
							status={this.props.status}
							requestType={this.props.requestType}
							songs={this.state.songs}
							links={this.state.links}
							pageSize={this.state.pageSize}
							sortBy={this.state.sortBy}
							searchBy={this.state.searchBy}
							itemTextInput={this.state.itemTextInput}
							attributes={this.state.attributes}
							onNavigate={this.onNavigate}
							onUpdate={this.onUpdate}
							onDelete={this.onDelete}
							updatePageSize={this.updatePageSize}
							cellSelected={this.state.cellSelected}/>
		)
	}
}

class SongList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		var songs = this.props.songs.map(song =>
			<Song key={song.entity._links.self.href}
					  song={song}
						songId={this.props.songID}
						arrangement={this.props.arrangement}
						status={this.props.status}
						requestType={this.props.requestType}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}/>
		);

		return (
			<div>
				{songs}
			</div>
		)
	}
}

class Song extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	handleDelete() {
		this.props.onDelete(this.props.song);
	}
	handleUpdate() {
		this.props.onUpdate(this.props.song);
	}
	render() {
//		songId: {this.props.songId}
//		arrangement: {this.props.arrangement}
//		status: {this.props.status}
//		requestType: {this.props.requestType}
//		name: {this.props.song.entity.name}
//		artist: {this.props.song.entity.artist}
//		album: {this.props.song.entity.album}
//		songyear: {this.props.song.entity.songyear}
//		dateadded: {this.props.song.entity.dateadded}
//		lastplayed: {this.props.song.entity.lastplayed}
//		playcount: {this.props.song.entity.playcount}
//<div className="seq-model">

/*<div>
	<table>
		<tbody>
			<tr>
				<td>
					<figure>
						<img src={"cover?id=" + this.props.song.entity.albumid} alt={this.props.song.entity.albumid} height='150px' width='150px'  />
					</figure>
				</td>
				<td>
					<p>{this.props.status}</p>
					<p>{this.props.song.entity.tracknumber}: {this.props.song.entity.name}</p>
					<p>{this.props.song.entity.album}</p>
					<p>{this.props.song.entity.artist}</p>
					<p>{this.props.song.entity.songyear}</p>
				</td>
			</tr>
		</tbody>
	</table>
</div>
*/
		return (
			<div >
					<ul>
						<li>
						<div className="col-md-4">
									<figure>
									  <img src={"cover?id=" + this.props.song.entity.albumid} alt={this.props.song.entity.albumid} height='200px' width='200px'  />
									</figure>
						</div>
						<div className="col-md-4">
								  <p>{this.props.status}</p>
									<p>{this.props.song.entity.tracknumber}: {this.props.song.entity.name}</p>
									<p>{this.props.song.entity.album}</p>
									<p>{this.props.song.entity.artist}</p>
									<p>{this.props.song.entity.songyear}</p>
						</div>
						</li>
					</ul>

			</div>


		)
	}
}


  export default SongInfo;
