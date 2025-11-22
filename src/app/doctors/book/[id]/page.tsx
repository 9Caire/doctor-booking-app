"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doctorsData } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock slots data generator
const generateSlots = () => {
    const times = [
        "6:00 PM", "6:15 PM", "6:30 PM",
        "7:00 PM", "7:15 PM", "7:30 PM",
        "8:00 PM", "8:15 PM", "8:30 PM"
    ];
    return times.map(time => ({
        time,
        available: Math.random() > 0.3 // 70% chance of being available
    }));
};

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    // Find doctor across all specialties (currently only cardiology in data)
    const doctor = Object.values(doctorsData)
        .flat()
        .find((d) => d.id === id);

    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Generate next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d,
            slots: generateSlots() // In a real app, this would come from an API based on date
        };
    });

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>
                    <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to list
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Doctor Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center sticky top-10">
                            <div className="w-48 h-48 relative mb-6">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-gray-100"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
                            <p className="text-[#28a99e] font-medium mt-1">{doctor.specialty}</p>
                            <p className="text-gray-500 text-sm mt-2">{doctor.experience} Experience</p>

                            <div className="w-full mt-6 border-t pt-6 text-left">
                                <h3 className="font-semibold text-gray-700 mb-2">About</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {doctor.about}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Slots */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Pick a time slot</h2>

                            {/* Date Slider */}
                            <div className="mb-2">
                                <p className="text-sm text-gray-600 mb-4">
                                    Available on <span className="font-medium text-gray-800">{doctor.workdays}</span>
                                </p>
                            </div>

                            <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-xl">
                                <button
                                    onClick={() => setSelectedDate(prev => Math.max(0, prev - 1))}
                                    disabled={selectedDate === 0}
                                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 transition"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                                </button>

                                <div className="flex-1 text-center px-4">
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                        {dates[selectedDate].date === new Date().getDate() ? "Today" :
                                            dates[selectedDate].date === new Date().getDate() + 1 ? "Tomorrow" :
                                                `${dates[selectedDate].day}, ${dates[selectedDate].fullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                                    </p>
                                    <p className="text-green-600 text-xs font-semibold mt-1">
                                        {dates[selectedDate].slots.filter(s => s.available).length} slots available
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedDate(prev => Math.min(dates.length - 1, prev + 1))}
                                    disabled={selectedDate === dates.length - 1}
                                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 transition"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Slots Grid */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-700 mb-4">Available Slots</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {dates[selectedDate].slots.map((slot, idx) => (
                                        <button
                                            key={idx}
                                            disabled={!slot.available}
                                            onClick={() => setSelectedSlot(slot.time)}
                                            className={cn(
                                                "py-2 px-3 rounded-lg text-sm font-medium border transition relative",
                                                !slot.available
                                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed decoration-slice line-through"
                                                    : selectedSlot === slot.time
                                                        ? "bg-[#28a99e] text-white border-[#28a99e] shadow-md"
                                                        : "bg-white text-gray-700 border-gray-300 hover:border-[#28a99e] hover:text-[#28a99e]"
                                            )}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Confirmation Area */}
                            <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    {selectedSlot ? (
                                        <>
                                            <p className="text-sm text-gray-500">Selected Slot</p>
                                            <p className="text-lg font-bold text-[#28a99e]">
                                                {selectedSlot} on {dates[selectedDate].day}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-400">Please select a slot to proceed</p>
                                    )}
                                </div>

                                <Button
                                    disabled={!selectedSlot}
                                    className="w-full sm:w-auto bg-[#28a99e] hover:bg-[#1f857c] text-white px-8 py-6 text-lg h-auto"
                                >
                                    Confirm Booking
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
