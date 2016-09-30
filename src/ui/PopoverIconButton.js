/* @flow */

import React, {Component} from 'react';
import IconButton from './IconButton';
import InputPopover from './InputPopover';
import autobind from 'class-autobind';
var Dropzone = require('react-dropzone');


type Props = {
  iconName: string;
  showPopover: boolean,
  onTogglePopover: Function,
  onSubmit: Function;
};

export class PopoverImageButton extends Component {
  props: Props;

  constructor(props) {
    super(props);
    autobind(this);
  }

  onDrop(files) {
    var reader  = new FileReader();
      let _this = this
      reader.addEventListener("load", function () {
        _this.props.onSubmit(reader.result)
      }, false);
    if (files[0]) {
    reader.readAsDataURL(files[0]);
  }
  }

  render(): React.Element {
    let {props} = this;
    return (
        <Dropzone onDrop={this.onDrop} ref='dropzone' accept='image/*'
              style={{
                width: 'auto',
                height: 'auto',
                border: 0
      }}
          >
              <IconButton {...props}>
              </IconButton>
        </Dropzone>
    );
  }
}

export default class PopoverIconButton extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {onTogglePopover, showPopover, ...props} = this.props; // eslint-disable-line no-unused-vars
    return (
      <IconButton {...props} onClick={onTogglePopover}>
        {this._renderPopover()}
      </IconButton>
    );
  }

  _renderPopover() {
    if (!this.props.showPopover) {
      return null;
    }
    return (
      <InputPopover
        onSubmit={this._onSubmit}
        onCancel={this._hidePopover}
      />
    );
  }

  _onSubmit() {
    this.props.onSubmit(...arguments);
  }

  _hidePopover() {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...arguments);
    }
  }
}
