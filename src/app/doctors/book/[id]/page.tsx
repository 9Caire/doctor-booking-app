"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doctorsData } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

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
    const [dates] = useState(() => Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d,
            slots: generateSlots() // In a real app, this would come from an API based on date
        };
    }));

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Steps: PHONE -> OTP -> (SIGNUP) -> PATIENT_DETAILS
    type Step = 'PHONE' | 'OTP' | 'SIGNUP' | 'PATIENT_DETAILS';
    const [currentStep, setCurrentStep] = useState<Step>('PHONE');

    const [userDetails, setUserDetails] = useState({
        // Auth
        phone: "",
        otp: "",
        fullName: "", // Account Holder Name
        email: "",

        // Patient Details
        patientName: "",
        patientAge: "",
        patientGender: "", // 'male' | 'female' | 'other'
        contactNumber: "" // Defaults to auth phone
    });

    // Mock User Database check
    const checkUserExists = (phone: string) => {
        // Mock: Only "9999999999" exists
        return phone === "9999999999";
    };

    const handleConfirmClick = () => {
        setIsModalOpen(true);
        setCurrentStep('PHONE'); // Always start fresh for now
        // In real app, check if already logged in
    };

    const handleSendOtp = () => {
        if (userDetails.phone.length >= 10) {
            // Mock sending OTP
            alert("OTP sent: 1234");
            setCurrentStep('OTP');
        } else {
            alert("Please enter a valid phone number");
        }
    };

    const handleVerifyOtp = () => {
        if (userDetails.otp === "1234") {
            // Check if user exists
            const exists = checkUserExists(userDetails.phone);
            if (exists) {
                // Pre-fill contact number for patient details
                setUserDetails(prev => ({ ...prev, contactNumber: prev.phone }));
                setCurrentStep('PATIENT_DETAILS');
            } else {
                setCurrentStep('SIGNUP');
            }
        } else {
            alert("Invalid OTP. Use 1234");
        }
    };

    const handleSignUp = () => {
        if (userDetails.fullName && userDetails.email) {
            // Create account logic here
            // Pre-fill contact number for patient details
            setUserDetails(prev => ({ ...prev, contactNumber: prev.phone }));
            setCurrentStep('PATIENT_DETAILS');
        } else {
            alert("Please fill in all fields");
        }
    };

    const handlePatientDetailsSubmit = () => {
        if (userDetails.patientName && userDetails.patientAge && userDetails.patientGender && userDetails.contactNumber) {
            // Proceed to payment
            const queryParams = new URLSearchParams({
                date: dates[selectedDate].fullDate.toISOString(),
                slot: selectedSlot!,
                amount: "1000",
                patientName: userDetails.patientName,
                patientAge: userDetails.patientAge,
                patientGender: userDetails.patientGender,
                contactNumber: userDetails.contactNumber
            }).toString();

            router.push(`/doctors/book/${id}/payment?${queryParams}`);
        } else {
            alert("Please fill in all patient details");
        }
    };

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

                            <div className="flex items-center gap-2 mt-3 bg-gray-50 px-3 py-1.5 rounded-full">
                                <Globe className="w-3.5 h-3.5 text-gray-500" />
                                <p className="text-xs font-medium text-gray-600">
                                    {doctor.languages.join(", ")}
                                </p>
                            </div>

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
                                    onClick={handleConfirmClick}
                                    className="w-full sm:w-auto bg-[#28a99e] hover:bg-[#1f857c] text-white px-8 py-6 text-lg h-auto"
                                >
                                    Confirm Booking
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Multi-step Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                {/* Step 1: Phone Number */}
                {currentStep === 'PHONE' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Sign In</h2>
                            <p className="text-sm text-gray-500">Enter your phone number to continue</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none transition"
                                placeholder="9876543210"
                                value={userDetails.phone}
                                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                            />
                        </div>
                        <Button
                            className="w-full bg-[#28a99e] hover:bg-[#1f857c] text-white py-6 text-lg"
                            onClick={handleSendOtp}
                            disabled={userDetails.phone.length < 10}
                        >
                            Get OTP
                        </Button>
                    </div>
                )}

                {/* Step 2: OTP */}
                {currentStep === 'OTP' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>
                            <p className="text-sm text-gray-500">Enter the 4-digit code sent to {userDetails.phone}</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none text-center text-2xl tracking-[0.5em] font-mono"
                                placeholder="0000"
                                maxLength={4}
                                value={userDetails.otp}
                                onChange={(e) => setUserDetails({ ...userDetails, otp: e.target.value })}
                            />
                            <div className="flex justify-between mt-2 text-xs">
                                <span className="text-gray-500">Use 1234 as OTP</span>
                                <button onClick={() => setCurrentStep('PHONE')} className="text-[#28a99e] hover:underline">Change Number</button>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-[#28a99e] hover:bg-[#1f857c] text-white py-6 text-lg"
                            onClick={handleVerifyOtp}
                            disabled={userDetails.otp.length !== 4}
                        >
                            Verify
                        </Button>
                    </div>
                )}

                {/* Step 3: Sign Up (New User) */}
                {currentStep === 'SIGNUP' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-sm text-gray-500">We need a few details to get you started</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none"
                                placeholder="John Doe"
                                value={userDetails.fullName}
                                onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none"
                                placeholder="john@example.com"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            />
                        </div>
                        <Button
                            className="w-full bg-[#28a99e] hover:bg-[#1f857c] text-white py-6 text-lg"
                            onClick={handleSignUp}
                            disabled={!userDetails.fullName || !userDetails.email}
                        >
                            Create Account
                        </Button>
                    </div>
                )}

                {/* Step 4: Patient Details */}
                {currentStep === 'PATIENT_DETAILS' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Patient Details</h2>
                            <p className="text-sm text-gray-500">Who is this appointment for?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none"
                                placeholder="Patient's Full Name"
                                value={userDetails.patientName}
                                onChange={(e) => setUserDetails({ ...userDetails, patientName: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none"
                                    placeholder="25"
                                    value={userDetails.patientAge}
                                    onChange={(e) => setUserDetails({ ...userDetails, patientAge: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none bg-white"
                                    value={userDetails.patientGender}
                                    onChange={(e) => setUserDetails({ ...userDetails, patientGender: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="tel"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none"
                                placeholder="Contact Number"
                                value={userDetails.contactNumber}
                                onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                * This number should belong to someone close to the patient
                            </p>
                        </div>

                        <Button
                            className="w-full bg-[#28a99e] hover:bg-[#1f857c] text-white py-6 text-lg mt-2"
                            onClick={handlePatientDetailsSubmit}
                            disabled={!userDetails.patientName || !userDetails.patientAge || !userDetails.patientGender || !userDetails.contactNumber}
                        >
                            Confirm & Pay
                        </Button>
                    </div>
                )}

            </Modal>
        </div>
    );
}
