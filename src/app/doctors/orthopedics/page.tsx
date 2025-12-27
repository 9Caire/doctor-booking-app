"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doctorsData } from "@/data/doctors";
import { useRouter, useParams } from "next/navigation";
import { Award, CheckCircle2, ChevronLeft, MapPin, Search, ShieldCheck } from "lucide-react";

export default function DoctorsListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const params = useParams();
    const router = useRouter();
    const specialty = (params?.specialty as string)?.toLowerCase();
    const doctors = doctorsData.orthopedics || [];
    const [location, setLocation] = useState("");

    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-[600px] w-full z-10 mb-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-image.jpg"
                        alt="Kuwait City Skyline"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-900/10" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-start align-center pt-32 text-white">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl text-[#124265] md:text-6xl text-center font-medium tracking-tight mb-4 leading-tight">
                            Find and Book the <span className="text-[#124265] font-extrabold">Best Doctors in Kuwait</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-center text-[#124265] mb-6 font-medium">
                            Easy, Secure, Reliable Healthcare Appointments
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mb-8 justify-center">
                            {[
                                { icon: Award, text: "Top Specialists" },
                                { icon: ShieldCheck, text: "Secure & Private" },
                                { icon: CheckCircle2, text: "Quick Booking" },
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 bg-white border-white/20 px-4 py-2 rounded-full text-sm text-[#124265] font-semibold"
                                >
                                    <feature.icon className="h-4 w-4 text-[#124265]" />
                                    {feature.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Search Bar */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4">
                    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by Doctor, Specialty, or Clinic"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <select
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 appearance-none"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Select Location</option>
                                    <option value="kuwait-city">Kuwait City</option>
                                    <option value="salmiya">Salmiya</option>
                                    <option value="hawally">Hawally</option>
                                </select>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <Search className="h-5 w-5" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div>
                        {/* Breadcrumb / Back */}
                        <div className="mb-6">
                            <button
                                onClick={() => router.back()}
                                className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back to home
                            </button>
                        </div>

                    </div>
                    <h1 className="text-3xl font-semibold text-gray-800 mb-8 capitalize text-center">
                        Orthopedics Specialists
                    </h1>

                    {doctors.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No doctors available for this specialty.
                        </p>
                    ) : (
                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {doctors.map((doc) => (
                                <li
                                    key={doc.name}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
                                >
                                    <div className="w-50 relative mb-4 aspect-square overflow-hidden rounded-full">
                                        <Image
                                            src={doc.image}
                                            alt={doc.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    <h3 className="text-xl font-medium text-gray-800">{doc.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-4">
                                        {doc.workdays}
                                    </p>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl w-full hover:bg-blue-700 text-white transition-all active:scale-[0.98] shadow-md shadow-blue-100"
                                        onClick={() => router.push(`/doctors/book/${doc.id}`)}
                                    >
                                        Book Appointment
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}