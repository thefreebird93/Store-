"use client";

import { useState } from "react";

export default function Filter({ categories = [], onFilter }) {
  const [selected, setSelected] = useState("all");

  const handleChange = (value) => {
    setSelected(value);
    onFilter && onFilter(value);
  };

  return (
    <div className="flex gap-3 flex-wrap mb-6">
      <button
        onClick={() => handleChange("all")}
        className={`px-4 py-2 rounded-md border ${
          selected === "all" ? "bg-primary text-white" : "bg-white"
        }`}
      >
        الكل
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.id)}
          className={`px-4 py-2 rounded-md border ${
            selected === cat.id ? "bg-primary text-white" : "bg-white"
          }`}
        >
          {cat.name_ar}
        </button>
      ))}
    </div>
  );
}
