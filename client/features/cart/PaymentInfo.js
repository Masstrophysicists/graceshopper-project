import React from "react";

function PaymentInfo() {
  return (
    <div className="payment flex flex-col mt-8">
      <div className="card bg-white p-4 rounded-lg mb-8">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Payment info</h3>
        <label className="flex items-center gap-2">
          Card No:{" "}
          <input
            type="number"
            placeholder="2424-2424-2424-2424"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </label>
        <label className="flex items-center gap-2">
          Security code:{" "}
          <input
            type="number"
            placeholder="242"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </label>
        <div className="expiry flex items-center gap-2">
          Expiry:{" "}
          <input
            type="number"
            placeholder="04"
            className="px-2 py-1 rounded border border-gray-300"
          />
          /{" "}
          <input
            type="number"
            placeholder="24"
            className="px-2 py-1 rounded border border-gray-300"
          />
        </div>
      </div>
      <div className="delivery bg-white p-4 rounded-lg">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Delivery info</h3>
        <label className="flex items-center gap-2">
          Address line 1:{" "}
          <input className="px-2 py-1 rounded border border-gray-300" />
        </label>
        <label className="flex items-center gap-2">
          Address line 2:{" "}
          <input className="px-2 py-1 rounded border border-gray-300" />
        </label>
        <label className="flex items-center gap-2">
          Zip code:{" "}
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
