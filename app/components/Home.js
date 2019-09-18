// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import PdfViewer from './PdfViewer';
type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  constructor (props) {
    super(props);
  }
  handleClick(e) {
    this.refs.fileUploader.click();
  }
  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({file}); /// if you want to upload latter
}
  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click()
}
  render() {
    return (
            <div className={styles.frame} data-tid="container">
            <div className={styles.leftBar}>
            <span className={styles.files}>Files</span>
            <div className={styles.docList}>
              <div className={styles.docContainer}>
              
              </div>
            </div>
            <input type="file" id="file" ref="fileUploader" onChange={this.onChangeFile.bind(this)} style={{display: "none"}}/>
            <button onClick={this.handleClick.bind(this)} className={styles.upload}><span className={styles.icon}></span>Upload Files</button>
            </div>
            <div className={styles.rightBar}>
            <PdfViewer />
            </div>
            </div>
    );
  }
}
