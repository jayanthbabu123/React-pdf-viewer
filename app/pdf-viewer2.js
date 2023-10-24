"use client";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PDFViewer2 = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [annotations, setAnnotations] = useState([]);
  const [annotationText, setAnnotationText] = useState("");
  const annotationInputRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next Page
        </button>
        <button
          onClick={() => setScale(Math.min(2, scale + 0.1))}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Zoom In
        </button>
        <button
          onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Zoom Out
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add annotation..."
          onChange={(e) => setAnnotationText(e.target.value)}
          ref={annotationInputRef}
          className="w-2/3 px-4 py-2 border rounded focus:outline-none"
        />
        <button
          onClick={() => {
            setAnnotations([
              ...annotations,
              { page: pageNumber, text: annotationText },
            ]);
            setAnnotationText("");
            annotationInputRef.current.value = "";
          }}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add Annotation
        </button>
      </div>
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          width={600 * scale}
        />
        {annotations.map((annotation, index) =>
          annotation.page === pageNumber ? (
            <div
              key={index}
              style={{
                position: "absolute",
                top: 100,
                left: 100,
                background: "yellow",
              }}
            >
              {annotation.text}
            </div>
          ) : null
        )}
      </Document>
    </div>
  );
};

export default PDFViewer2;
