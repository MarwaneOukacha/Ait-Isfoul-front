import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFileAlt } from "react-icons/fa";
import { searchMyBookings } from "../services/bookingService";
import LogoDark from '../assets/img/white.svg';
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

// === PDF Invoice Styles (react-pdf) ===
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 40,
    backgroundColor: "#ffffff",
    color: "#333333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomStyle: "solid",
  },
  companyTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    letterSpacing: 2,
  },
  headerRight: {
    alignItems: "flex-end",
    fontSize: 10,
    color: "#666666",
  },
  headerRightText: {
    marginBottom: 2,
  },
  providerCustomerSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  providerSection: {
    flex: 1,
    marginRight: 40,
  },
  customerSection: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  providerText: {
    fontSize: 10,
    marginBottom: 3,
    color: "#333333",
  },
  providerCompany: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333333",
  },
  billingSection: {
    marginBottom: 30,
  },
  billingText: {
    fontSize: 10,
    marginBottom: 3,
    color: "#333333",
  },
  billingLabel: {
    fontWeight: "bold",
  },
  invoiceSection: {
    marginBottom: 30,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  invoiceDetailsTable: {
    flexDirection: "row",
    marginBottom: 30,
  },
  invoiceDetailCell: {
    border: "1px solid #cccccc",
    padding: 8,
    minHeight: 40,
  },
  invoiceDetailHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    fontSize: 10,
    borderBottom: "1px solid #cccccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  invoiceDetailValue: {
    fontSize: 10,
    color: "#333333",
  },
  servicesSection: {
    marginBottom: 30,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  table: {
    border: "1px solid #cccccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #cccccc",
  },
  tableHeaderCell: {
    padding: 10,
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    borderRight: "1px solid #cccccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #cccccc",
  },
  tableCell: {
    padding: 10,
    fontSize: 10,
    color: "#333333",
    textAlign: "center",
    borderRight: "1px solid #cccccc",
  },
  dateCol: { width: "15%" },
  descriptionCol: { width: "35%" },
  qtyCol: { width: "15%" },
  rateCol: { width: "17.5%" },
  totalCol: { width: "17.5%" },
  vatSection: {
    marginTop: 20,
  },
  vatTable: {
    border: "1px solid #cccccc",
  },
  vatHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #cccccc",
  },
  vatHeaderCell: {
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    borderRight: "1px solid #cccccc",
  },
  vatRow: {
    flexDirection: "row",
    borderBottom: "1px solid #cccccc",
  },
  vatCell: {
    padding: 8,
    fontSize: 10,
    color: "#333333",
    textAlign: "center",
    borderRight: "1px solid #cccccc",
  },
  vatBasisCol: { width: "25%" },
  vatRateCol: { width: "25%" },
  vatAmountCol: { width: "25%" },
  vatTotalCol: { width: "25%" },
  totalsSection: {
    alignItems: "flex-end",
    marginTop: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 5,
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  totalValue: {
    fontSize: 10,
    color: "#333333",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    borderTopStyle: "solid",
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
});

// === PDF Invoice Document Component ===
function InvoicePDFDocument({ booking }) {
  const {
    bookingReference,
    room,
    checkIn,
    price,
    customer,
  } = booking;

  const invoiceDate = new Date().toLocaleDateString();
  const invoiceNumber = bookingReference || "N/A";

  const services = [
    {
      date: checkIn || "",
      description: room?.title || "Room booking",
      qty: "1",
      rate: `${price} USD`,
      total: `${price} USD`,
    },
  ];

  const subtotal = price || "0.00";
  const vatRate = "20%";
  const vatAmount = (parseFloat(subtotal) * 0.2).toFixed(2);
  const totalPayable = (parseFloat(subtotal) + parseFloat(vatAmount)).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyTitle}>Ait-Isfoul Hotel</Text>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightText}>Ait-Isfoul Hotel</Text>
            <Text style={styles.headerRightText}>Company reg. no.: 098765432</Text>
            <Text style={styles.headerRightText}>VAT reg. no.: GB98765432</Text>
          </View>
        </View>

        {/* Provider and Customer sections */}
        <View style={styles.providerCustomerSection}>
          <View style={styles.providerSection}>
            <Text style={styles.sectionHeader}>PROVIDER</Text>
            <Text style={styles.providerCompany}>GoodCompany Ltd</Text>
            <Text style={styles.providerText}>Company reg. no.: 098765432</Text>
            <Text style={styles.providerText}>VAT reg. no.: GB98765432</Text>
            <Text style={styles.providerText}>Firstname Lastname - Director</Text>
            <Text style={styles.providerText}>9900 Tall Building</Text>
            <Text style={styles.providerText}>100 Wide Street</Text>
            <Text style={styles.providerText}>W1W London</Text>
            <Text style={styles.providerText}>United Kingdom</Text>
          </View>
          <View style={styles.customerSection}>
            <Text style={styles.sectionHeader}>CUSTOMER</Text>
            <Text style={styles.providerText}>{customer?.name || "Customer Name"}</Text>
            <Text style={styles.providerText}>{customer?.email || "email@example.com"}</Text>
          </View>
        </View>

        {/* Billing Information */}
        <View style={styles.billingSection}>
          <Text style={styles.sectionHeader}>BILLING INFORMATION</Text>
          <Text style={styles.billingText}><Text style={styles.billingLabel}>BIC:</Text> ABCDGB21</Text>
          <Text style={styles.billingText}><Text style={styles.billingLabel}>IBAN:</Text> GB39 ABCD 0011 0011 0011 00</Text>
          <Text style={styles.billingText}>Account number: 01234567</Text>
          <Text style={styles.billingText}>Sort code: 01-00-01</Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.invoiceSection}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <View style={styles.invoiceDetailsTable}>
            <View style={[styles.invoiceDetailCell, { width: "50%" }]}>
              <Text style={styles.invoiceDetailHeader}>Invoice Date</Text>
              <Text style={styles.invoiceDetailValue}>{invoiceDate}</Text>
            </View>
            <View style={[styles.invoiceDetailCell, { width: "50%" }]}>
              <Text style={styles.invoiceDetailHeader}>Invoice Number</Text>
              <Text style={styles.invoiceDetailValue}>{invoiceNumber}</Text>
            </View>
          </View>
        </View>

        {/* Services Table */}
        <View style={styles.servicesSection}>
          <Text style={styles.servicesTitle}>Works completed / Services provided</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.dateCol]}>Date</Text>
              <Text style={[styles.tableHeaderCell, styles.descriptionCol]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.qtyCol]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.rateCol]}>Rate</Text>
              <Text style={[styles.tableHeaderCell, styles.totalCol, { borderRight: "none" }]}>Total</Text>
            </View>
            {services.map((service, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.tableCell, styles.dateCol]}>{service.date}</Text>
                <Text style={[styles.tableCell, styles.descriptionCol]}>{service.description}</Text>
                <Text style={[styles.tableCell, styles.qtyCol]}>{service.qty}</Text>
                <Text style={[styles.tableCell, styles.rateCol]}>{service.rate}</Text>
                <Text style={[styles.tableCell, styles.totalCol, { borderRight: "none" }]}>{service.total}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* VAT & Totals */}
        <View style={styles.vatSection}>
          <View style={styles.vatTable}>
            <View style={styles.vatHeaderRow}>
              <Text style={[styles.vatHeaderCell, styles.vatBasisCol]}>VAT Basis</Text>
              <Text style={[styles.vatHeaderCell, styles.vatRateCol]}>VAT rate</Text>
              <Text style={[styles.vatHeaderCell, styles.vatAmountCol]}>VAT Amount</Text>
              <Text style={[styles.vatHeaderCell, styles.vatTotalCol, { borderRight: "none" }]}>Total</Text>
            </View>
            <View style={styles.vatRow}>
              <Text style={[styles.vatCell, styles.vatBasisCol]}>{subtotal} USD</Text>
              <Text style={[styles.vatCell, styles.vatRateCol]}>{vatRate}</Text>
              <Text style={[styles.vatCell, styles.vatAmountCol]}>{vatAmount} USD</Text>
              <Text style={[styles.vatCell, styles.vatTotalCol, { borderRight: "none" }]}>{totalPayable} USD</Text>
            </View>
          </View>

          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>VAT:</Text>
              <Text style={styles.totalValue}>{vatAmount} USD</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Payable:</Text>
              <Text style={styles.grandTotalValue}>{totalPayable} USD</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}


export default function ReservationList() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await searchMyBookings({ page: 0, size: 100 });
        setBookings(resp.content || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  
  // Generate & download invoice PDF for the given booking
  const handleDownloadInvoice = async (booking) => {
    try {
      const doc = <InvoicePDFDocument booking={booking} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${booking.bookingReference || "unknown"}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF invoice:", error);
    }
  };
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mt-16 mb-16">
        <h1 className="text-xl font-semibold text-gray-900 text-left mt-4 mb-6">My Room Bookings</h1>
        <div className="mt-2 h-1 w-16 bg-accent mx-0"></div>
      </div>

      <div className="shadow-lg border rounded-lg">
        <div className="p-6">
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Room</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Booking ID</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Check-in</th>
                  <th className="px-8 py-5 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-8 py-5 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.bookingReference} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-medium text-gray-900">{booking.room?.title}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.bookingReference}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.room?.price} USD</td>
                    <td className="px-8 py-5 text-sm text-gray-500">{booking.checkIn}</td>
                    <td className="px-8 py-5 text-sm">
                      <span className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className="text-gray-500 hover:text-gray-700 mr-4"
                        onClick={() => handleDownloadInvoice(booking)}
                      >
                        <FaFileAlt className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            {currentBookings.map((booking) => (
              <div key={booking.bookingReference} className="border-b border-gray-200 p-6">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">{booking.room?.title}</span>
                  <span className={`inline-block px-4 py-2 text-xs font-semibold leading-tight ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Booking ID:</span>
                    <span className="ml-2">{booking.bookingReference}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <span className="ml-2">{booking.room?.price} USD</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-in:</span>
                    <span className="ml-2">{booking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-out:</span>
                    <span className="ml-2">{booking.checkOut}</span>
                  </div>
                </div>
                <button
                  className="mt-4 text-blue-500"
                  onClick={() => setExpandedBooking(expandedBooking === booking.bookingReference ? null : booking.bookingReference)}
                >
                  {expandedBooking === booking.bookingReference ? "Hide Details" : "Show Details"}
                </button>
                {expandedBooking === booking.bookingReference && (
                  <div className="mt-4">
                    <p><strong>Customer:</strong> {`${booking.customer.firstName} ${booking.customer.lastName}`}</p>
                    <p><strong>Email:</strong> {booking.customer.email}</p>
                    <p><strong>Phone:</strong> {booking.customer.phoneNumber}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center py-6 space-x-4">
            <button
              className="h-10 w-10 rounded-full border border-gray-300 p-3 text-gray-600 hover:bg-gray-200"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 rounded-full border border-gray-300 p-3 ${
                  currentPage === index + 1 ? "bg-accent text-white" : "bg-white text-gray-600"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="h-10 w-10 rounded-full border border-gray-300 p-3 text-gray-600 hover:bg-gray-200"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
