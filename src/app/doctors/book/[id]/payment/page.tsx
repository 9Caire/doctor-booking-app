"use client";

import React from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doctorsData } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CreditCard, Calendar, Clock } from "lucide-react";

export default function PaymentPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = params?.id as string;

    const dateStr = searchParams.get("date");
    const slot = searchParams.get("slot");
    const amount = searchParams.get("amount");

    const doctor = Object.values(doctorsData)
        .flat()
        .find((d) => d.id === id);

    const date = dateStr ? new Date(dateStr) : new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    if (!doctor) return null;

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
                                    <p className="text-sm text-[#28a99e]">{doctor.specialty}</p>
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
                                <span className="text-2xl font-bold text-gray-800">${amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-fit">
                        <div className="flex gap-3 mb-6">
                            <button className="flex-1 py-2 px-4 border-2 border-[#28a99e] bg-[#28a99e]/5 text-[#28a99e] font-medium rounded-lg flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" /> Card
                            </button>
                            <button className="flex-1 py-2 px-4 border border-gray-200 text-gray-500 font-medium rounded-lg hover:bg-gray-50">
                                UPI / Netbanking
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cardholder Name</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none transition" placeholder="John Doe" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none transition" placeholder="0000 0000 0000 0000" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expiry</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none transition" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">CVV</label>
                                    <input type="password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#28a99e] outline-none transition" placeholder="123" maxLength={3} />
                                </div>
                            </div>

                            <Button className="w-full mt-6 bg-[#28a99e] hover:bg-[#1f857c] text-white py-6 text-lg shadow-lg shadow-[#28a99e]/20">
                                Pay ${amount}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
