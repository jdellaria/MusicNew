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

import SongInfo from './songInfo'

const root = '/api/playQs/search';


class CurrentInQ extends React.Component {

	constructor(props) {
		super(props);
		this.state = {playQs: [], cellSelected: [], attributes: [], sortBy: "status,asc,arrangement,asc,id,asc", searchBy:'findBystatusCurPlayInQ', page: 1, status: '', itemtext: '', itemTextInput: '', pageSize: 1, sort:"status,asc,arrangement,asc,id,asc", links: {}};
	//	this.state = {playQs: [], attributes: [], searchBy:'findByplayQContainingIgnoreCaseOrstatusContainingIgnoreCaseOrderByDateAddedDesc', page: 1, status: '', pageSize: 8, sort:"status,asc", links: {}};

		this.updatePageSize = this.updatePageSize.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
console.log("playQDisplay: constructor" );
	}

	loadFromServer(itemTextUpdate, pageSize, pageSortUpdate) {
//this.state.item = this.props.itemParameter

		follow(client, root, [
				{rel: this.state.searchBy, params: {size: pageSize, sort:pageSortUpdate, item:this.props.itemParameter, status: itemTextUpdate}}] //itemText}}]
	//			{rel: this.state.searchBy, params: {size: pageSize, sort:pageSort, status: status}}]
	).then(playQCollection => {
				return client({
					method: 'GET',
					path: "api/profile/playQs",
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					this.schema = schema.entity;
					this.links = playQCollection.entity._links;
					return playQCollection;
				});
		}).then(playQCollection => {
			this.page = playQCollection.entity.page;
			return playQCollection.entity._embedded.playQs.map(playQ =>
					client({
						method: 'GET',
						path: playQ._links.self.href
					})
			);
		}).then(playQPromises => {
			return when.all(playQPromises);
		}).done(playQs => {
			this.setState({
				page: this.page,
				playQs: playQs,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				sort: pageSortUpdate,
				status: itemTextUpdate,
				links: this.links
			});
//			console.log("props.playQs[0].entity.itemtext = " + this.props.playQs[0].entity.itemtext);
		});
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(playQCollection => {
			this.links = playQCollection.entity._links;
			this.page = playQCollection.entity.page;

			return playQCollection.entity._embedded.playQs.map(playQ =>
					client({
						method: 'GET',
						path: playQ._links.self.href
					})
			);
		}).then(playQPromises => {
			return when.all(playQPromises);
		}).done(playQs => {
			this.setState({
				page: this.page,
				playQs: playQs,
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
	// tag::websocket-handlers[]
	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'playQs',
			params: {size: this.state.pageSize, status: this.state.itemTextInput}
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
			rel: 'playQs',
			params: {
				size: this.state.pageSize,
				status: this.state.itemTextInput,
				page: this.state.page.number
			}
		}]).then(playQCollection => {
			this.links = playQCollection.entity._links;
			this.page = playQCollection.entity.page;

			return playQCollection.entity._embedded.playQs.map(playQ => {
				return client({
					method: 'GET',
					path: playQ._links.self.href
				})
			});
		}).then(playQPromises => {
			return when.all(playQPromises);
		}).then(playQs => {
			this.setState({
				page: this.page,
				playQs: playQs,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				status: this.state.itemTextInput,
				links: this.links
			});

		});
	}

	// end::websocket-handlers[]
	// tag::register-handlers[]
	componentDidMount() {
		this.loadFromServer(this.state.itemTextInput, this.state.pageSize, this.state.sortBy);
		stompClient.register([
			{route: '/topic/newPlayQ', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updatePlayQ', callback: this.refreshCurrentPage},
			{route: '/topic/deletePlayQ', callback: this.refreshCurrentPage}
		]);
	}
	// end::register-handlers[]
	//	<p>Cells Selected: {JSON.stringify(this.state.cellSelected)}</p>
	/*
	<PlayQList page={this.state.page}
					playQs={this.state.playQs}
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

					*/
	render() {
		return (
			<PlayQList page={this.state.page}
							playQs={this.state.playQs}
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

class PlayQList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		var itemTextInput = ReactDOM.findDOMNode(this.refs.itemTextInput).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(itemTextInput, pageSize, this.props.sortBy, this.props.searchBy);
		} else {
			ReactDOM.fin
			dDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
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
		var pageInfo = this.props.page.hasOwnProperty("number") ?
			<div>Page {this.props.page.number + 1} of {this.props.page.totalPages}</div> : null;
		var playQs = this.props.playQs.map(playQ =>
			<PlayQ key={playQ.entity._links.self.href}
					  playQ={playQ}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}/>
		);

		var navLinks = [];
//		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
//		}
//		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
//		}
//		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
//		}
//		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
//		}

		return (
			<div>
				{playQs}{navLinks}
			</div>
		)
	}
}

class PlayQ extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	handleDelete() {
		this.props.onDelete(this.props.playQ);
	}
	handleUpdate() {
		this.props.onUpdate(this.props.playQ);
	}
	render() {
		return (

					<SongInfo 	songId={this.props.playQ.entity.songID}
					 				arrangement={this.props.playQ.entity.arrangement}
									status={this.props.playQ.entity.status}
									requestType={this.props.playQ.entity.requestType}/>

		)
	}
}


  export default CurrentInQ;
