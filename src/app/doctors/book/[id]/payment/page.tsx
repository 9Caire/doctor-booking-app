"use client";

import React from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doctorsData } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CreditCard, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = params?.id as string;

    const dateStr = searchParams.get("date");
    const slot = searchParams.get("slot");
    const amount = searchParams.get("amount");

    // Patient Details
    const patientName = searchParams.get("patientName");
    const patientAge = searchParams.get("patientAge");
    const patientGender = searchParams.get("patientGender");
    const contactNumber = searchParams.get("contactNumber");

    const doctor = Object.values(doctorsData)
        .flat()
        .find((d) => d.id === id);

    const date = dateStr ? new Date(dateStr) : new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    const [status, setStatus] = React.useState<'IDLE' | 'PROCESSING' | 'CONFIRMED'>('IDLE');

    const handlePayment = () => {
        setStatus('PROCESSING');
        setTimeout(() => {
            setStatus('CONFIRMED');
        }, 2000);
    };

    if (!doctor) return null;

    if (status === 'CONFIRMED') {
        return (
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-500 mb-8">Your appointment has been successfully scheduled.</p>

                    <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 mb-8">
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                                <p className="text-xs text-blue-600">{doctor.specialty}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Date & Time</p>
                                <p className="font-medium text-gray-800">{formattedDate}</p>
                                <p className="font-medium text-gray-800">{slot}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Patient</p>
                                <p className="font-medium text-gray-800">{patientName}</p>
                                <p className="text-gray-500 text-xs">{patientAge} yrs, {patientGender}</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => router.push('/')}
                        className="w-full bg-blue-600 hover-blue-700 text-white py-6 text-lg"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to booking
                    </button>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-8">Make Payment</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Appointment Summary</h2>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                                    <p className="text-sm text-blue-600">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium">{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium">{slot}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t flex justify-between items-center">
                                <span className="text-gray-500">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-800">{amount} KD</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-fit relative overflow-hidden">
                        {status === 'PROCESSING' && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-600 font-medium animate-pulse">Processing Payment...</p>
                            </div>
                        )}

                        <div className="flex gap-3 mb-6">
                            <button className="flex-1 py-2 px-4 border border-gray-200 text-gray-500 font-medium rounded-lg hover:bg-gray-50">
                                KNET
                            </button>
                            <button className="flex-1 py-2 px-4 border-2 border-blue-600 bg-blue-600/5 text-blue-600 font-medium rounded-lg flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" /> Credit Card
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cardholder Name</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="John Doe" required />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="0000 0000 0000 0000" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expiry</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="MM/YY" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">CVV</label>
                                    <input type="password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" placeholder="123" maxLength={3} required />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg shadow-lg shadow-blue-600/20"
                            >
                                Pay {amount} KD
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
