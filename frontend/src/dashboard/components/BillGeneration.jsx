import { useState } from "react";
import { jsPDF } from "jspdf";

const BillGeneration = () => {
  const [formData, setFormData] = useState({
    name: "",
    flatNumber: "",
    lastReading: "",
    currentReading: "",
    electricUnit: "",
    commonUnit: "",
    totalElectricUnit: "",
    electricBill: "",
    serviceCharge: "",
    waterCharge: "",
    totalBillOfMonth: "",
    lastArrear: "",
    addAmount: "",
    totalDueOfMonth: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (updated.currentReading && updated.lastReading) {
        updated.electricUnit = updated.currentReading - updated.lastReading;
      }

      if (updated.electricUnit && updated.commonUnit) {
        updated.totalElectricUnit =
          Number(updated.electricUnit) + Number(updated.commonUnit);
      }

      if (updated.totalElectricUnit) {
        updated.electricBill = (updated.totalElectricUnit * 5.1).toFixed(2);
      }

      if (updated.electricBill && updated.serviceCharge && updated.waterCharge) {
        updated.totalBillOfMonth =
          Number(updated.electricBill) +
          Number(updated.serviceCharge) +
          Number(updated.waterCharge);
      }

      if (
        updated.totalBillOfMonth &&
        updated.lastArrear !== "" &&
        updated.addAmount !== ""
      ) {
        updated.totalDueOfMonth =
          Number(updated.totalBillOfMonth) +
          Number(updated.lastArrear) +
          Number(updated.addAmount);
      }

      return updated;
    });
  };

  // Handle form submit (frontend only)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const newBill = { ...formData };

    setSubmittedData((prev) => [...prev, newBill]);

    // Download bill as PDF immediately
    generatePDF(newBill);

    // Reset form
    setFormData({
      name: "",
      flatNumber: "",
      lastReading: "",
      currentReading: "",
      electricUnit: "",
      commonUnit: "",
      totalElectricUnit: "",
      electricBill: "",
      serviceCharge: "",
      waterCharge: "",
      totalBillOfMonth: "",
      lastArrear: "",
      addAmount: "",
      totalDueOfMonth: "",
    });
  };

  // Generate PDF using jsPDF
  const generatePDF = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Society Maintenance Bill", 20, 20);
    doc.setFontSize(12);

    let y = 40;
    Object.entries(bill).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, y);
      y += 10;
    });

    doc.save(`Bill_${bill.flatNumber}.pdf`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Bill Generation Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg"
      >
        {[
          ["name", "Name"],
          ["flatNumber", "Flat Number"],
          ["lastReading", "Last Reading"],
          ["currentReading", "Current Reading"],
          ["electricUnit", "Electric Unit"],
          ["commonUnit", "Common Unit"],
          ["totalElectricUnit", "Total Electric Unit"],
          ["electricBill", "Electric Bill"],
          ["serviceCharge", "Service Charge"],
          ["waterCharge", "Water Charge"],
          ["totalBillOfMonth", "Total Bill of Month"],
          ["lastArrear", "Last Arrear"],
          ["addAmount", "Add Amount"],
          ["totalDueOfMonth", "Total Due of Month"],
        ].map(([key, label]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-gray-700 font-semibold mb-2"
            >
              {label}
            </label>
            <input
              type={
                [
                  "flatNumber",
                  "lastReading",
                  "currentReading",
                  "electricUnit",
                  "commonUnit",
                  "totalElectricUnit",
                  "electricBill",
                  "serviceCharge",
                  "waterCharge",
                  "totalBillOfMonth",
                  "lastArrear",
                  "addAmount",
                  "totalDueOfMonth",
                ].includes(key)
                  ? "number"
                  : "text"
              }
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={[
                "electricUnit",
                "totalElectricUnit",
                "electricBill",
                "totalBillOfMonth",
                "totalDueOfMonth",
              ].includes(key)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Submit & Download PDF
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
      )}
      </div>
  );
};

export default BillGeneration;
