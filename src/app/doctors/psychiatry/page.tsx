"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doctorsData } from "@/data/doctors";
import { useRouter, useParams } from "next/navigation";

export default function DoctorsListPage() {
    const params = useParams();
    const router = useRouter();
    const specialty = (params?.specialty as string)?.toLowerCase();
    const doctors = doctorsData.pyschiatry || [];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 capitalize text-center">
                    Psychiatry Specialists
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
                                <Button className="bg-[#28a99e] hover:bg-blue-700 text-white" onClick={() => router.push(`/doctors/book/${doc.id}`)}>
                                    Book Now
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
