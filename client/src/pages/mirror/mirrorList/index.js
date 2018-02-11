import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from './../action';

import { CenterWrapper, HorizontalRowWrapper } from '../../../components/Wrapper';
import { Form, Input } from './../../../components/Form';
import { MirrorBox } from './../../../components/MirrorLists';

class MirrorList extends Component {

  constructor(props) {
    super(props);
    {

        }
    this.state = {
      user: this.props.auth.currentUser._id,
      options: ['Date', 'Time', 'To-do', 'Weather'],
      sectionName: "sectionName"
    };
  }
  componentDidMount(){

  };

  // functions

  viewMirror() {
    console.log("Mirror Viewed");
  }
  addMirror() {

    this.props.MirrorPost(this.state.user)
      .then(() => {
        this.state.options.forEach((o, i) => {
          this.props.SectionPost(this.state.user, this.state.sectionName + i, o, this.props.mirror.mirror._id);
        });
      })
  }
  addSection(){
    this.props.SectionPost()
  }

  // render functions

  renderMirrors(mirrorList) {

      return (

        <CenterWrapper>
          <HorizontalRowWrapper >

            {mirrorList.map((m, i) => {
              <MirrorBox onClick={this.viewMirror.bind(this)} > {m._id} </MirrorBox>
            })}

            {this.renderAddMirrors()}
          </HorizontalRowWrapper>
      </CenterWrapper>

      )
  }
  renderAddMirrors(){
    if(this.props.auth.currentUser.mirror.length <= 5) {
      return(
        <MirrorBox onClick={this.addMirror.bind(this)} > add me </MirrorBox>
      )
    }
  }

  //render

  render() {
    const mirrorList = this.props.auth.currentUser.mirror;
    return (
      this.renderMirrors(mirrorList)
    );
  }
}

// mapStateToProps

const mapStateToProps = ({ auth, mirror }) => {
  return {
    auth,
    mirror
  }
};

export default connect(mapStateToProps, { ...actions})(MirrorList);
