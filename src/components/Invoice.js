import React, { forwardRef, useImperativeHandle, useRef } from "react";
import html2pdf from "html2pdf.js";
import { FaDownload } from "react-icons/fa";

const Invoice = forwardRef(
  (
    {
      companyName = "Ait-Isfoul Hotel",
      companyReg = "098765432",
      vatReg = "GB98765432",
      providerName = "GoodCompany Ltd",
      providerTitle = "Firstname Lastname - Director",
      providerAddress = ["9900 Tall Building", "100 Wide Street", "W1W London", "United Kingdom"],
      customerName = "",
      customerAddress = [],
      bic = "ABCDGB21",
      iban = "GB39 ABCD 0011 0011 0011 00",
      accountNumber = "01234567",
      sortCode = "01-00-01",
      invoiceDate = "31/4/2025",
      invoiceNumber = "INV-0",
      items = [
        {
          date: "31/4/2025",
          description: "",
          qty: "1days",
          rate: "£0/days",
          total: "£0",
        },
      ],
      vatBasis = "$0.00",
      vatRate = "20%",
      vatAmount = "£0.00",
      total = "£0.00",
      vatTotal = "£0.00",
      totalPayable = "£0.00",
    },
    ref
  ) => {
    const invoiceRef = useRef();

    useImperativeHandle(ref, () => ({
      generatePDF() {
        const element = invoiceRef.current;
        const options = {
          margin: 0.5,
          filename: `${invoiceNumber}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(options).from(element).save();
      },
    }));

    const handleDownload = () => {
      if (ref && typeof ref.current?.generatePDF === "function") {
        ref.current.generatePDF();
      }
    };

    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Invoice content for PDF */}
        <div
          ref={invoiceRef}
          className="max-w-5xl mx-auto p-[100px] bg-white shadow-md border border-gray-300"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{companyName}</h1>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>{companyName} Ltd</div>
              <div>Company reg. no.: {companyReg}</div>
              <div>VAT reg. no.: {vatReg}</div>
            </div>
          </div>

          <hr className="mb-8" />

          {/* Provider and Customer */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Provider
              </h3>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{providerName}</div>
                <div>Company reg. no.: {companyReg}</div>
                <div>VAT reg. no.: {vatReg}</div>
                <div className="mt-2">{providerTitle}</div>
                {providerAddress.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Customer
              </h3>
              <div className="space-y-1 text-sm">
                {customerName && <div className="font-medium">{customerName}</div>}
                {customerAddress.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Billing Information
            </h3>
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-medium">BIC:</span> {bic}
              </div>
              <div>
                <span className="font-medium">IBAN:</span> {iban}
              </div>
              <div className="mt-2">Account number: {accountNumber}</div>
              <div>Sort code: {sortCode}</div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Invoice</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="border border-gray-300">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                  <span className="font-medium text-sm">Invoice Date</span>
                </div>
                <div className="px-3 py-2 text-sm">{invoiceDate}</div>
              </div>
              <div className="border border-gray-300">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                  <span className="font-medium text-sm">Invoice Number</span>
                </div>
                <div className="px-3 py-2 text-sm">{invoiceNumber}</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Works completed / Services provided
            </h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-2 py-1 text-sm">Date</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">Description</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">Qty</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">Rate</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 text-center text-sm">{item.date}</td>
                    <td className="border border-gray-300 text-center text-sm">{item.description}</td>
                    <td className="border border-gray-300 text-center text-sm">{item.qty}</td>
                    <td className="border border-gray-300 text-center text-sm">{item.rate}</td>
                    <td className="border border-gray-300 text-center text-sm">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VAT and Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-2xl">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 text-sm py-1">VAT Basis</th>
                    <th className="border border-gray-300 text-sm py-1">VAT Rate</th>
                    <th className="border border-gray-300 text-sm py-1">VAT Amount</th>
                    <th className="border border-gray-300 text-sm py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 text-center text-sm">{vatBasis}</td>
                    <td className="border border-gray-300 text-center text-sm">{vatRate}</td>
                    <td className="border border-gray-300 text-center text-sm">{vatAmount}</td>
                    <td className="border border-gray-300 text-center text-sm">{total}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 space-y-2 text-right">
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">VAT:</span>
                  <span>{vatTotal}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-gray-300 font-bold">
                  <span>Total Payable:</span>
                  <span>{totalPayable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button shown below invoice (not in PDF) */}
        <div className="flex justify-end mt-6 max-w-5xl mx-auto">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            <FaDownload />
            Download Invoice
          </button>
        </div>
      </div>
    );
  }
);

export default Invoice;
