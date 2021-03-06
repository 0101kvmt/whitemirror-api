import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as actions from './../action';

import { CenterWrapper, HorizontalRowWrapper } from '../../../components/Wrapper';
import { Form, Input } from './../../../components/Form';
import { MirrorBox, MirrorBoxTitle, MirrorDelete, LinkStyle } from './../../../components/MirrorLists';

class MirrorList extends Component {

  constructor(props) {
    super(props);
    {

        }
    this.state = {
      user: this.props.auth.currentUser._id,
      options: ['Date', 'Time', 'To-do', 'Weather'],
      sectionName: "sectionName",
      clickable: true,
    };
  }
  componentDidMount(){

  };

  // functions

  viewMirror() {
    console.log("Mirror Viewed");
  }

  addMirror() {
    console.log("user before mirror", this.props.auth.currentUser._id);
    this.props.MirrorPost(this.props.auth.currentUser._id)
      .then(() => {
        this.state.options.forEach((o, i) => {
          this.props.SectionPost(this.state.user, this.state.sectionName + i, o, this.props.mirror.mirror._id);
        });
      });
  }

  deleteMirror(mirror) {
    let section = mirror.section;
    console.log("mirrr", mirror);
    console.log("section", section);

    while(section.length > 0){

      section.forEach((s, i) => {
          this.props.OptionDelete(s.options)
          .then(() => {
            section.forEach((s, i) => {
              this.props.SectionDelete(s._id)
            })
          })
      })

    }
      console.log("deleting mirror", mirror._id);
      this.props.MirrorDelete(mirror._id);
  }
  addSection(){
    this.props.SectionPost()
  }

  editMirror = (mirror) => {
    console.log("edit mirror", mirror);

    this.props.currentMirror(mirror);
  }
  navMirrorEdit() {

  }

  // render functions

  renderMirrors() {
    const mirrorList = this.props.auth.currentUser.mirror;
    console.log(mirrorList);
      return (

        <CenterWrapper>
          <HorizontalRowWrapper >

            {this.props.auth.currentUser.mirror.map((m, i) => {
              return (
                  <MirrorBox>
                    <MirrorDelete>x</MirrorDelete>
                      <Link style={LinkStyle} to="/mirrorEditPage" onClick={() => {this.editMirror(m)}} >Mirror {i + 1}</Link>
                  </MirrorBox>
              )

            })}

            {this.renderAddMirrors()}
          </HorizontalRowWrapper>
      </CenterWrapper>

      )
  }
  renderAddMirrors(){
    if(this.props.auth.currentUser.mirror.length <= 5) {
      return(
        <MirrorBox onClick={this.addMirror.bind(this)} clickable={this.state.clickable} > add me </MirrorBox>
      )
    }
  }

  //render

  render() {
    return (
      this.renderMirrors()
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
