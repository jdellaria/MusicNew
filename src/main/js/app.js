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


import CurrentInQ from './currentInQ'
import AlbumDisplay from './album'

class App extends React.Component {

	constructor(props) {
		super(props);


	}

	componentDidMount() {

	}
	// end::register-handlers[]
	//	<p>Cells Selected: {JSON.stringify(this.state.cellSelected)}</p>
	//<SongA 	songId='62000' arrangement= '45' status="Jonny's test" requestType="Manual"/>
	//<playQDisplay/>
	render() {
		return (
				<div>

					<AlbumDisplay/>

				</div>
		)
	}
}


ReactDOM.render(
		<App />,
	document.getElementById('react')
)
