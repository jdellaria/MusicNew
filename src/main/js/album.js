'use strict';

import React from 'react';
import ReactDOM, { render } from 'react-dom'
import when from 'when';
import client from './client';

import follow from'./follow'; // function to hop multiple links by "rel"

import stompClient from './websocket-listener';
import CurrentInQ from './currentInQ'
import Slider from 'rc-slider';

//import 'bootstrap/dist/css/bootstrap.min.css'
import 'rc-slider/assets/index.css';
//import 'rc-slider/dist/rc-slider.css';
//const root = '/api';
const root = '/api/albums/search';



class PlayPauseButton extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      varPlay: true
    }
    this.handleChangeHorizontal = this.handleChangeHorizontal.bind(this);
  }

  handleChangeHorizontal(value)  {
    this.setState({
      horizontal: value
    })
  };


  render () {
    if(this.props.play)
    {
      return (
        <i className="fa fa-play fa-2x fa-fw" id="musicplay" aria-hidden="true"></i>
      )
    }
    else
      {
        return (
        <i className="fa fa-pause fa-2x fa-fw" id="musicpause" aria-hidden="true"></i>
      )
      }
    }
}

class AlbumDisplay extends React.Component {

	constructor(props) {
		super(props);
//		this.state = {albums: [], attributes: [], page: 1, pageSize: 8, links: {}};
		this.state = {albums: [], horizontal: 100, cellSelected: [], togglePlayPause:true, attributes: [], searchBy:'findByAlbumContainingIgnoreCaseOrArtistnameContainingIgnoreCase', page: 1, artistname: '', pageSize: 8, sort:"dateAdded,desc", links: {}};

		this.updatePageSize = this.updatePageSize.bind(this);
		this.onSubmitAlbum = this.onSubmitAlbum.bind(this);
		this.onSubmitPlayMode = this.onSubmitPlayMode.bind(this);
		this.onSubmitVolume = this.onSubmitVolume.bind(this);

		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
		this.onDataCellClick = this.onDataCellClick.bind(this);
		this.onDataCellClickCarat = this.onDataCellClickCarat.bind(this);
		this.togglePlayPause = this.togglePlayPause.bind(this);
		this.onNextSongClick = this.onNextSongClick.bind(this);
		this.onNextAlbumClick = this.onNextAlbumClick.bind(this);
    this.handleChangeHorizontal = this.handleChangeHorizontal.bind(this);
    		console.log("App: constructor");
	}
	onDataCellClick(selected) {
		var mySortBy = 'artistname,desc';
    const index = this.state.cellSelected.indexOf(selected);
    if (index < 0) {
						if (selected == 5){ //artist
							mySortBy = 'artistname,asc';
						}
						if (selected ==4){ //album
							mySortBy = 'album,asc';
						}
						if (selected == 3){ //last played
							mySortBy = 'lastSelected,asc';
						}
						if (selected == 2){ //year
							mySortBy = 'songyear,asc';
						}
						if (selected == 1){ //date added
							mySortBy = 'dateAdded,asc';

						}
							console.log("onDataCellClick mySortBy:" + mySortBy);
			this.state.cellSelected.push(selected);
    } else {

				if (selected == 5){ //artist
					mySortBy = 'artistname,desc';
				}
				if (selected ==4){ //album
					mySortBy = 'album,desc';
				}
				if (selected == 3){ //last played
					mySortBy = 'lastSelected,desc';
				}
				if (selected == 2){ //year
					mySortBy = 'songyear,desc';
				}
				if (selected == 1){ //date added
					mySortBy = 'dateAdded,desc';
				}
console.log("onDataCellClick mySortBy:" + mySortBy);
      this.state.cellSelected.splice(index, 1);
    }
    this.setState({ cellSelected: [...this.state.cellSelected] });
		this.setState({ sort: mySortBy });
		this.loadFromServer(this.state.artistname, this.state.pageSize, mySortBy);
  }

  onDataCellClickCarat(selected) {
    const index = this.state.cellSelected.indexOf(selected);
    if (index < 0) {
      return( "fa fa-caret-down") ;
    } else {
      return( "fa fa-caret-up") ;
    }
  }

	loadFromServer(artistName, pageSize, pageSort) {

      		console.log("App: loadFromServer");
		this.setState({ artistname: artistName });
		follow(client, root, [
				{rel: this.state.searchBy, params: {size: pageSize, sort:pageSort, artistname: artistName}}]
		).then(albumCollection => {
				return client({
					method: 'GET',
					path: "api/profile/albums",
					pageSize: pageSize,
					sort: pageSort,
					artistname: artistName,
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					this.schema = schema.entity;
					this.links = albumCollection.entity._links;
					return albumCollection;
				});
		}).then(albumCollection => {
			this.page = albumCollection.entity.page;
			return albumCollection.entity._embedded.albums.map(album =>
					client({
						method: 'GET',
						path: album._links.self.href
					})
			);
		}).then(albumPromises => {
			return when.all(albumPromises);
		}).done(albums => {
			this.setState({
				page: this.page,
				albums: albums,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				sort: pageSort,
				artistname: artistName,
				links: this.links
			});
		});
	}

	onSubmitAlbum(album) {
		var albumURL = album.url;
		var albumPOS = albumURL.lastIndexOf("/");
		var albumID = albumURL.slice(albumPOS+1);

		console.log("onSubmitAlbum: albumID=" + albumID);
		client({
			method: 'GET',
			path: "playalbum?id=" + albumID,
//			path: "playalbum",
//			id: albumID,
//			entity: newAlbum,
			headers: {'Content-Type': 'application/json'}
		})
	}

  onSubmitPlayMode(mode) {

  	console.log("onSubmitPlay: mode=" + mode);
  	client({
  		method: 'GET',
  		path: "playmode?id=" + mode,
  //			path: "playalbum",
  //			id: albumID,
  //			entity: newAlbum,
  		headers: {'Content-Type': 'application/json'}
  	})
  }

	onSubmitVolume(value) {

		console.log("onSubmitVolume: value=" + value);
		client({
			method: 'GET',
<<<<<<< HEAD
			path: "volume?id=" + value,
=======
			path: "playmode?id=" + value,
>>>>>>> d7ab8d03eecfda1916bfee32a400fc9ddadb685f
//			path: "playalbum",
//			id: albumID,
//			entity: newAlbum,
			headers: {'Content-Type': 'application/json'}
		})
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(albumCollection => {
			this.links = albumCollection.entity._links;
			this.page = albumCollection.entity.page;

			return albumCollection.entity._embedded.albums.map(album =>
					client({
						method: 'GET',
						path: album._links.self.href
					})
			);
		}).then(albumPromises => {
			return when.all(albumPromises);
		}).done(albums => {
			this.setState({
				page: this.page,
				albums: albums,
				attributes: Object.keys(this.schema.properties),
				artistname: this.state.artistname,
				pageSize: this.state.pageSize,
				sort: this.state.pageSort,
				links: this.links
			});
		});
	}
	updatePageSize(artistName, pageSize, pageSort, searchBy) {
	//		this.state.searchBy = searchBy;

			this.loadFromServer(artistName, pageSize, pageSort);
	}

	// tag::websocket-handlers[]
	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'albums',
			params: {size: this.state.pageSize, artistname: this.state.artistname, sort: pageSort}
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
			rel: 'albums',
			params: {
				size: this.state.pageSize,
				artistname: this.state.artistname,
				page: this.state.page.number
			}
		}]).then(albumCollection => {
			this.links = albumCollection.entity._links;
			this.page = albumCollection.entity.page;

			return albumCollection.entity._embedded.albums.map(album => {
				return client({
					method: 'GET',
					path: album._links.self.href
				})
			});
		}).then(albumPromises => {
			return when.all(albumPromises);
		}).then(albums => {
			this.setState({
				page: this.page,
				albums: albums,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				artistname: this.state.artistname,
				links: this.links
			});
		});
	}
	onNextSongClick()
	{
		console.log("HeaderTop: onNextSongClick" );
    this.onSubmitPlayMode("NextSong");
	}

	onNextAlbumClick()
	{
		console.log("HeaderTop: onNextAlbumClick" );
    this.onSubmitPlayMode("NextAlbum");
	}
	// end::websocket-handlers[]
	togglePlayPause() {
    this.setState({
      togglePlayPause: !this.state.togglePlayPause
    });
    this.state.togglePlayPause = !this.state.togglePlayPause
    if(this.state.togglePlayPause) //true = Play
    {
      this.onSubmitPlayMode("Play");
      console.log("HeaderTop: togglePlayPause Play" );
    }
    else {
      this.onSubmitPlayMode("Pause");
      console.log("HeaderTop: togglePlayPause Pause" );
    }
  }
	// tag::register-handlers[]
	componentDidMount() {
		this.loadFromServer(this.state.artistname, this.state.pageSize, this.state.sort);
		stompClient.register([
			{route: '/topic/newAlbum', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateAlbum', callback: this.refreshCurrentPage},
			{route: '/topic/deleteAlbum', callback: this.refreshCurrentPage}
		]);
	}

  handleChangeHorizontal(value) {
    this.setState({
      horizontal: value
    })
    this.onSubmitVolume(value);
  };
	// end::register-handlers[]
//<playQDisplay/>
//			<i onClick={this.togglePlayPause}><PlayPauseButton play={this.state.togglePlayPause} /></i>
	render() {
    console.log("App: render");
    const { horizontal } = this.state
    const formatPc = p => p + '%'

          return (
  <section id="aa-product">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <i onClick={this.togglePlayPause}><PlayPauseButton play={this.state.togglePlayPause} /></i>
          <i onClick={this.onNextSongClick} className="fa fa-step-forward fa-2x  fa-fw" aria-hidden="true"></i>
          <i onClick={this.onNextAlbumClick} className="fa fa-fast-forward fa-2x  fa-fw" aria-hidden="true"></i>
        </div>
        <div className="col-md-4">
          <Slider
            min={0}
            max={100}
            value={horizontal}
            format={formatPc}
            onChange={this.handleChangeHorizontal}
          />
        </div>
        <div className="col-md-4">
          <i className="fa fa-volume-up fa-2x fa-fw" aria-hidden="true"></i>
          {formatPc(horizontal)}
        </div>
      </div>
				<AlbumList page={this.state.page}
							  albums={this.state.albums}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  artistName={this.state.artistname}
							  attributes={this.state.attributes}
							  onNavigate={this.onNavigate}
							  onUpdate={this.onUpdate}
							  onDelete={this.onDelete}
							  onSubmitAlbum={this.onSubmitAlbum}
                searchBy={this.state.searchBy}
							  updatePageSize={this.updatePageSize}

								onDataCellClick={this.onDataCellClick}
								onDataCellClickCarat={this.onDataCellClickCarat}
								/>
			</div>
  </section>
         )
	}
}


class AlbumList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);

        console.log("AlbumList: constructor");
	}

	handleInput(e) {
		e.preventDefault();
//		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		var artistName = ReactDOM.findDOMNode(this.refs.artistName).value;
			this.props.updatePageSize(artistName, this.props.pageSize, this.refs.artistName, this.props.searchBy);

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
			<h3>Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

		var albums = this.props.albums.map(album =>
			<Album key={album.entity._links.self.href}
					  album={album}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}
					  onSubmitAlbum={this.props.onSubmitAlbum}/>
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
//				Page Size <input ref="pageSize" defaultValue={this.props.pageSize}  onInput={this.handleInput}/>
//<SongA 	songId='62000' arrangement= '45' status="Jonny's test" requestType="Manual"/>
// playQDisplay
                return (


      <div className="row">
			<CurrentInQ/>
        <div className="col-md-12">
          <div className="row">
            <div className="aa-product-area">
							<div class="aa-search-box">
								{pageInfo}
								<form action="">
									<input ref="artistName" type="text" size="75" defaultValue={this.props.artistName} id="" placeholder="Search here for Albums or Artists " onInput={this.handleInput}/>
								</form>
								{navLinks}
							</div>

              <div className="aa-product-inner">

                <ul className="nav nav-tabs aa-products-tab">

                  <li className="active"><a href="#Added" data-toggle="tab" onClick={() => this.props.onDataCellClick(1)}>Date Added <i className={this.props.onDataCellClickCarat(1)}></i></a></li>
                  <li><a href="#Year" data-toggle="tab"  onClick={() => this.props.onDataCellClick(2)}>Year <i className={this.props.onDataCellClickCarat(2)}></i></a></li>
                  <li><a href="#Played" data-toggle="tab" onClick={() => this.props.onDataCellClick(3)}>Last Played <i className={this.props.onDataCellClickCarat(3)}></i></a></li>
                  <li><a href="#Album" data-toggle="tab" onClick={() => this.props.onDataCellClick(4)}>Album <i className={this.props.onDataCellClickCarat(4)}></i></a></li>
                  <li><a href="#Artist" data-toggle="tab" onClick={() => this.props.onDataCellClick(5)}>Artist <i className={this.props.onDataCellClickCarat(5)}></i></a></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="Added">
                    <ul className="aa-product-catg">
                      {albums}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


                )
	}
}

class Album extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.doSubmitAlbum = this.doSubmitAlbum.bind(this);
	}

	doSubmitAlbum()
	{
	console.log("doSubmitAlbum");
		this.props.onSubmitAlbum(this.props.album);
	//  $.ajax({ url: "playalbum?id=" + albumID, cache: false});

	}
	handleDelete() {
		this.props.onDelete(this.props.album);
	}

	render() {
	var albumURL = this.props.album.url;
	var albumPOS = albumURL.lastIndexOf("/");
	var albumID = albumURL.slice(albumPOS+1);


    return (
              <li>
              <figure>
                <a className="aa-product-img" href={"#" + albumID}><img src={"cover?id=" + albumID} alt={this.props.album.entity.cover} height='250px' width='250px'  /></a>
                <a className="aa-add-card-btn" href={"#" + albumID} onClick={this.doSubmitAlbum} ><span className="fa fa-shopping-cart"></span>Play Album</a>
                  <figcaption>
                    <h4 className="aa-product-title"><a href={"#" + albumID}>{this.props.album.entity.album}</a></h4>
                    <span className="aa-product-price">{this.props.album.entity.artistname}</span><span className="aa-product-price"></span>
                  </figcaption>
              </figure>
              <div className="aa-product-hvr-content">
              <span className="aa-badge aa-sale" href={"#" + albumID}>{this.props.album.entity.songyear}</span>
                <a href={"#" + albumID} data-toggle="tooltip" data-placement="top" title={this.props.album.entity.artistname}><span className="fa fa-heart-o"></span></a>
                <a href={"#" + albumID} data-toggle="tooltip" data-placement="top" title="Compare"><span className="fa fa-exchange"></span></a>
                <a href={"#" + albumID} data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span className="fa fa-search"></span></a>

              </div>

              </li>
    )
	}
}
  export default AlbumDisplay;
/*ReactDOM.render(
		<App />,
	document.getElementById('react')
)
*/
