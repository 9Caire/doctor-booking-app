"use client"

import React from "react";

export default function Navbar() {
    return (
        <header className="bg-[#28a99e] border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo left */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-6 w-6"
                  aria-hidden
                >
                  <path d="M12 2C10.343 2 9 3.343 9 5v2H6a2 2 0 00-2 2v6a6 6 0 006 6h0a6 6 0 006-6V9a2 2 0 00-2-2h-3V5c0-1.657-1.343-3-3-3z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">9cAIre</span>
            </div>

            {/* Sign in button right */}
            <div>
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Sign In
              </button>
            </div>
          </div>
        </div>
    </header>
    )
}