// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.scss';
import PdfViewer from './PdfViewer';
type Props = {};

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            docList: [],
            isActiveUploader : false,
            activeDoc : null,
            activeItem : {}
        }
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    handleClick(e) {
        this.refs.fileUploader.click();
        this.setState({isActiveUploader: true});
    }
  
    onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        var docListTemp = this.state.docList;
        if(file && file.name.split('.')[1].toUpperCase() == 'PDF') {
            docListTemp.push(file);
            this.setState({ docList: docListTemp });
        }
        else {
            alert('please select only pdf file');
        }
        this.setState({isActiveUploader : !this.state.isActiveUploader});
    }
  
    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click();
    }

    loadFile(index) {
        this.setState({activeItem: this.state.docList[index]});
        this.setState({activeDoc: index})
    }
    

    render() {
        let listOfFiles = this.state.docList.map(function(item, index) { 
        return (  <div className = { (this.state.activeDoc === index) ? styles.activeDoc: null}>
        <div key={index} className = {styles.leftMenuButton} onClick={() => this.loadFile(index)}>
            <div className = { styles.icon }></div> 
            <div> < span className = { styles.docName } > { item.name } </span>  </div >
    </div></div>)
        }, this);
        return ( 
         
            <div className = { styles.frame }>
            <div className={ this.state.isActiveUploader ? styles.overlay: null}></div>
            <div className = { styles.leftBar }>
            <div className = { styles.readerZone }> </div> 
            <span className = { styles.files } > Files </span> 
            <div className = { styles.docList } > { listOfFiles } </div> 
            <input type = "file"
            id = "file"
            ref = "fileUploader"
            onChange = { this.onChangeFile.bind(this) 
            }
            style = {
                { display: "none" }
            }/> 
            <button onClick = { this.handleClick.bind(this) }
            className = { styles.upload } >
            <span className = { styles.icon } > </span> 
            <span > Upload Files </span> 
            </button > </div> 
            <div className = { styles.rightBar } >
            <PdfViewer listNameFromParent={this.state.activeItem}/ >
            </div> 
            </div >
        );
    }
}