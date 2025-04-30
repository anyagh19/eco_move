import React from "react";

function PaymentSummary({ amount }) {
  const delivery = 50;
  const tax = 20;
  const total = amount + delivery + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span>₹{delivery}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>₹{tax}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
