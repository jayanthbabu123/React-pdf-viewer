import React from "react";
import PDFViewer from "./pdf-viewer";
import PDFViewer2 from "./pdf-viewer2";
export default function Home() {
  return (
    <div>
      <h1>Viewing a PDF in Next.js</h1>
      {/* <PDFViewer pdfPath="./21583473018.pdf" /> */}
      <PDFViewer2 pdfPath="./21583473018.pdf" />
    </div>
  );
}
