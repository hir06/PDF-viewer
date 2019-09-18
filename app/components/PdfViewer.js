// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './PdfViewer.css';
//import { Document } from 'react-pdf/dist/entry.webpack';
// import { Document, Page } from 'react-pdf/build/entry.noworker';
import { Document, Page, setOptions } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
            <div className={styles.frame} data-tid="container">
        <Document
          file={samplePDF}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
  
            </div>
    );
  }
}
