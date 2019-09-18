// @flow
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
    this.setState({ numPages });
  }
  render() {
    const { pageNumber, numPages } = this.state;

    return (
        <div>
              <div className={styles.title}>
              <div className={styles.icon}></div>
              <span className={styles.name}>Document 1</span>
              </div>  
              <div className={styles.container}>
              <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file={samplePDF}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
              </div>
        </div>
    );
  }
}
