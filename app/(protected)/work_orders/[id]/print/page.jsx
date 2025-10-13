'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function PrintPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      const response = await fetch(`/api/work_orders/${id}`);
      const data = await response.json();
      setWorkOrder(data);
    };
    fetchWorkOrder();
  }, [id]);

  useEffect(() => {
    if (workOrder) {
      generateAndDownloadPdf();
    }
  }, [workOrder]);

  const generateAndDownloadPdf = async () => {
    const doc = new jsPDF();

    // Load image and convert to base64
    const response = await fetch('/Picture1.png');
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;

      // Add logo
      doc.addImage(base64data, 'PNG', 140, 15, 50, 20); // x, y, width, height

      // Add header
      doc.setFontSize(20);
      doc.text(`Work Order: ${workOrder.jobAddress.jobNumber}`, 15, 20);
      doc.setFontSize(12);
      doc.text(`Date: ${workOrder.date}`, 15, 30);

      // Add address
      doc.setFontSize(12);
      doc.text('Job Address:', 15, 50);
      doc.text(`${workOrder.jobAddress.streetNumber} ${workOrder.jobAddress.streetName}`, 15, 56);
      doc.text(workOrder.jobAddress.surburb, 15, 62);
      doc.text(workOrder.jobAddress.city, 15, 68);

      // Add work items table
      doc.autoTable({
        startY: 75,
        head: [['Item #', 'Description', 'Unit', 'Quantity', 'Rate', 'Cost']],
        body: workOrder.jobDetails.workItems.map(item => [
          item.itemNumber,
          item.description,
          item.unit,
          item.quantity,
          `R ${item.rate.toFixed(2)}`,
          `R ${item.cost.toFixed(2)}`
        ]),
      });

      let finalY = doc.lastAutoTable.finalY || 85;

      // Add materials table
      if (workOrder.jobDetails.materials && workOrder.jobDetails.materials.length > 0) {
        doc.autoTable({
          startY: finalY + 10,
          head: [['Material Code', 'Description', 'Quantity']],
          body: workOrder.jobDetails.materials.map(material => [
            material.materialCode,
            material.description,
            material.quantity
          ]),
        });
        finalY = doc.lastAutoTable.finalY;
      }

      // Add total cost
      doc.setFontSize(12);
      doc.text(`Total Cost: R ${workOrder.jobDetails.cost.toFixed(2)}`, 15, finalY + 10);

      // Save the PDF
      doc.save(`${workOrder.jobAddress.jobNumber}.pdf`);
      setGenerating(false);

      // Close the window after a short delay
      setTimeout(() => {
        window.close();
      }, 1000);
    };
  };

  if (generating) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Generating PDF file...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <p className="font-semibold text-gray-700">PDF file has been generated and download should start shortly.</p>
      <p className="text-sm text-gray-500">This window will close automatically.</p>
    </div>
  );
}