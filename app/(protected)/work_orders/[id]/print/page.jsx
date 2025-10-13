'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Invoice from '@/components/Template.jsx';

export default function PrintPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);
  const [generating, setGenerating] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchWorkOrder = async () => {
      console.log("Fetching work order...");
      const response = await fetch(`/api/work_orders/${id}`);
      const data = await response.json();
      setWorkOrder(data);
      console.log("Work order fetched:", data);
    };
    fetchWorkOrder();
  }, [id]);

  useEffect(() => {
    if (workOrder) {
      console.log("Work order state updated, preparing to generate PDF.");
      // Timeout to ensure component is rendered
      setTimeout(() => {
        generateAndDownloadPdf();
      }, 500);
    }
  }, [workOrder]);

  const generateAndDownloadPdf = async () => {
    console.log("generateAndDownloadPdf called");
    const element = invoiceRef.current;
    if (!element) {
      console.error("Invoice element not found");
      return;
    }

    console.log("Capturing invoice element with html2canvas...");
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      console.log("Canvas created");
      const imgData = canvas.toDataURL('image/png');
      console.log("Canvas converted to image data");

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      console.log("Image added to PDF");
      pdf.save(`${workOrder.jobAddress.jobNumber}.pdf`);
      console.log("PDF saved");

      setGenerating(false);

      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setGenerating(false);
    }
  };

  return (
    <div>
      {generating && (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="font-semibold text-gray-700">Generating PDF file...</p>
        </div>
      )}
      {!generating && (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <p className="font-semibold text-gray-700">PDF file has been generated and download should start shortly.</p>
          <p className="text-sm text-gray-500">This window will close automatically.</p>
        </div>
      )}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={invoiceRef}>
          <Invoice workOrder={workOrder} />
        </div>
      </div>
    </div>
  );
}