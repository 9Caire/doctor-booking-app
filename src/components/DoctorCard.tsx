import React from "react";
import Image from "next/image";
import { Star, Calendar, MapPin, Clock } from "lucide-react";
import { Doctor } from "@/data/mockData";

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Doctor Image */}
                <div className="relative h-32 w-32 flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-lg shadow-sm border border-gray-50">
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md">
                            <Star className="h-3 w-3 fill-blue-600 text-blue-600" />
                            <span className="text-xs font-bold text-blue-700">{doctor.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {doctor.name}
                            </h3>
                            <p className="text-sm font-medium text-blue-600">{doctor.specialty}</p>
                        </div>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{doctor.clinic}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm">{doctor.reviewCount} Reviews</span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${doctor.availability.status === "Available Today"
                                ? "bg-green-50 text-green-700 border border-green-100"
                                : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}>
                            <Clock className="h-3.5 w-3.5" />
                            {doctor.availability.status}
                            {doctor.availability.date && `: ${doctor.availability.date}`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-100">
                    Book Appointment
                </button>
            </div>
        </div>
    );
}
