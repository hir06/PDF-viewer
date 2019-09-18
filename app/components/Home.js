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
            docList: ['hiral'],
            activeItem : {}
        }
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }
    onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        var docListTemp = this.state.docList;
        docListTemp.push(file.name);
        this.setState({ docList: docListTemp });
        console.log(this.state.docList);
    }
  
    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click();
    }
    

    render() {
        let listOfFiles = this.state.docList.map(function(item, index) { 
        return (<div key={index} className = {styles.leftMenuButton}>
            <div className = { styles.icon }></div> 
            <div> < span className = { styles.docName } > { item } </span>  </div >
    </div> )
        });
        return ( <
            div className = { styles.frame } >
            <
            div className = { styles.leftBar } >
            <
            div className = { styles.readerZone } > < /div> <
            span className = { styles.files } > Files < /span> <
            div className = { styles.docList } > { listOfFiles } <
            /div> <
            input type = "file"
            id = "file"
            ref = "fileUploader"
            onChange = { this.onChangeFile.bind(this) }
            style = {
                { display: "none" }
            }
            /> <
            button onClick = { this.handleClick.bind(this) }
            className = { styles.upload } >
            <
            span className = { styles.icon } > < /span> <
            span > Upload Files < /span> < /
            button > <
            /div> <
            div className = { styles.rightBar } >
            <
            PdfViewer listNameFromParent={this.state.activeItem}/ >
            <
            /div> < /
            div >
        );
    }
}