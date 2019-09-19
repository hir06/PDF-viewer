import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Pdfviewer.scss';
//import { Document } from 'react-pdf/dist/entry.webpack';
// import { Document, Page } from 'react-pdf/build/entry.noworker';
import { Document, Page, setOptions } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import { Document } from 'react-pdf/dist/entry.webpack';
import samplePDF from '../utils/hiral_resume.pdf';
//setOptions({ workerSrc: '/pdf.worker.min.js', });

type Props = {};

export default class PdfViewer extends Component<Props> {
  props: Props;
  state = {
    numPages: null,
    pageNumber: 1,
  }
  constructor (props) {
    super(props);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    if (this.state.numPages != numPages) {
      this.setState({ pageNumber: 1 });
    }
    this.setState({ numPages });
    console.log('onDocumentLoadSuccess');
  }

  goToPrevPage = () => {
    if (this.state.pageNumber > 1) {
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    }
  }
  goToNextPage = () => {
    if (this.state.pageNumber < this.state.numPages) {
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }
  }
    

  render() {
    const { pageNumber, numPages } = this.state;

    let docData;
    let pageInfo;
    let buttons;
    if (this.props.listNameFromParent.path) {
      docData = <Document
        file={this.props.listNameFromParent.path}
        onLoadSuccess={this.onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} width={600} />
      </Document>

        buttons = <nav>
        <button onClick={this.goToPrevPage}>Prev</button>
        <button onClick={this.goToNextPage}>Next</button>
      </nav>

pageInfo = <p>
Page {pageNumber} of {numPages}
</p>

    } else {
      docData = "No PDF Selected";
    }

    return (
        <div>
              <div className={styles.title}>
              <div className={styles.icon}></div>
              <span className={styles.name}>{this.props.listNameFromParent.name}</span>
              </div>  
              <div className={styles.container}>
              {buttons}

        <div style={{ width: 600 }}>
          {docData}
        </div>

        {pageInfo}
              </div>
        </div>
    );
  }
}