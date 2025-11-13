"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("");

   const specialties = [
    { name: "Cardiology", img: "/images/cardiology.jpg" },
    { name: "Dermatology", img: "/images/dermatology.jpg" },
    { name: "Pediatrics", img: "/images/pediatrics.webp" },
    { name: "Orthopedics", img: "/images/orthopedics.jpg" },
    { name: "Psychiatry", img: "/images/psychiatry.jpg" },
    { name: "Ophthalmology", img: "/images/opthalmology.jpg" },
    { name: "ENT", img: "/images/ent.jpg" },
    { name: "Endocrinology", img: "/images/endocrinology.png" },
  ];

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Search area */}
        <section className="mb-16">
          <div className="mx-auto max-w-3xl">
            <label htmlFor="search" className="sr-only">
              Search doctors or specialties
            </label>
            <div className="relative">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors or specialties"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-32 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <button
                onClick={() => console.log("Search: ", query)}
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Specialties grid */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Browse Specialties
          </h2>

          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
              No specialties match "{query}".
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <li
                  key={s.name}
                  className="rounded-lg overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
                >
                  <Link
        href={`/doctors/${s.name.toLowerCase()}`}
        className="block rounded-lg overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
      >
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      {s.name}
                    </h3>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
