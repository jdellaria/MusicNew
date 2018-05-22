import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import 'vendor/bootstrap/css/bootstrap.min.css'
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Container, Row, Col,
  Tooltip,
  DropdownItem } from 'reactstrap';

//import Slider from 'react-rangeslider'
import Slider, { createSliderWithTooltip } from 'rc-slider';

import 'bootstrap/dist/css/bootstrap.min.css'
//import 'react-rangeslider/lib/index.css'
import 'rc-slider/assets/index.css';


function log(value) {
  console.log(value); //eslint-disable-line
}

function percentFormatter(v) {
  return `${v} %`;
}
const SliderWithTooltip = createSliderWithTooltip(Slider);

class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {  horizontal: 0,  }
    this.handleChangeHorizontal = this.handleChangeHorizontal.bind(this);
  }

  handleChangeHorizontal(value)
  {
    this.setState({
      horizontal: value
    })
  };


  render () {
    const { horizontal } = this.state
    const formatPc = p => p + '%'

    return (
      <div >
        <Container>
        <Row>
        <Col xs="2">
          <i> </i>
        </Col>
        <Col sm={{ size: 'auto', offset: 3 }}>
          <div className='value'>{formatPc(horizontal)}</div>
        </Col>
        <Col xs="2">
          <i> </i>
        </Col>
        </Row>
          <Row>
            <Col xs="2">
              <i className="fa fa-volume-off fa-2x  fa-fw" aria-hidden="true"> </i>
            </Col>
            <Col xs="8">
              <Slider
                min={0}
                max={100}
                value={horizontal}
                format={formatPc}
                onChange={this.handleChangeHorizontal}
              />
            </Col>
            <Col xs="2">
              <i className="fa fa-volume-up fa-2x fa-fw" aria-hidden="true"></i>
            </Col>
          </Row>

        </Container>
      </div>
    )
  }
}


class PlayPauseButton extends Component {
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



//  onClick() {
//    this.setState({ varPlay: !varPlay  });
//  }

/*
<div>
<i className="fa fa-play fa-2x fa-fw" id="musicplay" aria-hidden="true"></i>
<Tooltip placement="bottom" isOpen={this.state.tooltipPlayOpen} target="musicplay" toggle={this.togglePlayTooltip}>
  Currently Playing Songs, Press to Pause
</Tooltip>
<div/>
*/




class HeaderTop extends Component {

  constructor(props) {
    super(props);
    this.state = {pageSize: 8, togglePlayPause:true, tooltipPlayOpen:false};
    this.onDataCellClick = this.onDataCellClick.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.onNextSongClick = this.onNextSongClick.bind(this);
    this.onNextAlbumClick = this.onNextAlbumClick.bind(this);
    this.state = {
      togglePlayPause: true // true is play
    };
  }

  onDataCellClick(selected) {
    this.setState({ pageSize: selected });
    this.props.updateApplicationPageSize(selected);
  }

  onNextSongClick()
  {
    console.log("HeaderTop: onNextSongClick" );
  }

  onNextAlbumClick()
  {
    console.log("HeaderTop: onNextAlbumClick" );
  }

  togglePlayPause() {
    this.setState({
      togglePlayPause: !this.state.togglePlayPause
    });
    this.state.togglePlayPause = !this.state.togglePlayPause
    if(this.state.togglePlayPause) //true = Play
    {
      console.log("HeaderTop: togglePlayPause Play" );
    }
    else {
      console.log("HeaderTop: togglePlayPause Pause" );
    }
  }

    render() {

      return (
        <div>
          <Container>
            <Row>
              <Col>
                <HorizontalCustomLabels/>
              </Col>
              <Col>
                <i onClick={this.togglePlayPause}><PlayPauseButton play={this.state.togglePlayPause} /></i>
                <i onClick={this.onNextSongClick} className="fa fa-step-forward fa-2x  fa-fw" aria-hidden="true"></i>
                <i onClick={this.onNextAlbumClick} className="fa fa-fast-forward fa-2x  fa-fw" aria-hidden="true"></i>
                <i className="fa fa-refresh fa-spin fa-2x  fa-fw" aria-hidden="true"></i>
              </Col>
              <Col>Page Size - {this.state.pageSize}</Col>
              <Col>

                  <UncontrolledDropdown  inNavbar>
                    <DropdownToggle nav caret>
                       Data Set Size
                    </DropdownToggle>
                    <DropdownMenu >
                      <DropdownItem onClick={() => this.onDataCellClick(8)}>
                        8
                      </DropdownItem>
                      <DropdownItem onClick={() => this.onDataCellClick(16)}>
                        16
                      </DropdownItem>
                      <DropdownItem onClick={() => this.onDataCellClick(32)}>
                        32
                      </DropdownItem>
                      <DropdownItem onClick={() => this.onDataCellClick(64)}>
                        64
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

              </Col>
            </Row>
            </Container>
        </div>
        );
      }
  }
export default HeaderTop;
