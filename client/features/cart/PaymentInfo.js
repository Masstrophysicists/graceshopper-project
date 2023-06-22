import React, { useState, useEffect } from "react";

function PaymentInfo() {
  return (
    <div className="payment flex flex-col items-center mt-8">
      <div className="card bg-white p-4 rounded-lg mb-8 max-w-md w-full shadow-lg">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          Payment Information
        </h3>
        <label className="grid grid-cols-2 items-center gap-2">
          <div>Card No:</div>
          <input
            type="number"
            placeholder="2424-2424-2424-2424"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </label>
        <label className="grid grid-cols-2 items-center gap-2">
          <div>Security code:</div>
          <input
            type="number"
            placeholder="242"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </label>
        <div className="expiry grid grid-cols-2 items-center gap-2">
          <div>Expiry:</div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="04"
              className="px-2 py-1 rounded border w-16 border-gray-300"
            />
            <span className="text-center font-bold text-lg">/</span>
            <input
              type="number"
              placeholder="24"
              className="px-2 py-1 rounded border w-16 border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="delivery bg-white p-4 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          Delivery Information
        </h3>
        <label className="grid grid-cols-2 items-center gap-2">
          <div>Address line 1:</div>
          <input className="px-2 py-1 rounded border border-gray-300" />
        </label>
        <label className="grid grid-cols-2 items-center gap-2">
          <div>Address line 2:</div>
          <input className="px-2 py-1 rounded border border-gray-300" />
        </label>
        <label className="grid grid-cols-2 items-center gap-2">
          <div>Zip code:</div>
          <input
            type="number"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </label>
      </div>
    </div>
  );
}

export default PaymentInfo;
