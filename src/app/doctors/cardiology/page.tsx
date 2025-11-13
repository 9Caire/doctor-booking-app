"use client";

import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const doctorsData = {
  cardiology: [
    {
      name: "Dr. Rohan Mehta",
      workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
      image: "/images/doctors/doctor4.jpg",
    },
    {
      name: "Dr. Kavita Rao",
      workdays: "Tuesday and Wednesday from 1pm to 5pm",
      image: "/images/doctors/doctor2.webp",
    },
    {
      name: "Dr. Sameer Khanna",
      workdays: "Saturday and Sunday from 5pm to 7pm",
      image: "/images/doctors/doctor3.jpg",
    },
    {
      name: "Dr. Rahul Kumar",
      workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
      image: "/images/doctors/doctor5.avif",
    },
    {
      name: "Dr. Mason Ray",
      workdays: "Tuesday and Wednesday from 1pm to 5pm",
      image: "/images/doctors/doctor6.jpg",
    },
    {
      name: "Dr. Karishma Khanna",
      workdays: "Saturday and Sunday from 5pm to 7pm",
      image: "/images/doctors/doctor7.jpg",
    },
    {
      name: "Dr. Eley Toney",
      workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
      image: "/images/doctors/doctor8.jpg",
    },
    {
      name: "Dr. Kristina Liao",
      workdays: "Tuesday and Wednesday from 1pm to 5pm",
      image: "/images/doctors/doctor9.jpg",
    },
    {
      name: "Dr. Aasmaan Singh",
      workdays: "Saturday and Sunday from 5pm to 7pm",
      image: "/images/doctors/doctor3.jpg",
    },
  ],
};

export default function DoctorsListPage() {
  const params = useParams();
  const specialty = (params?.specialty as string)?.toLowerCase();
  const doctors = doctorsData.cardiology || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 capitalize text-center">
          Cardiology Specialists
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
                <div className="w-50 h-50 relative mb-4">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-800">{doc.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  {doc.workdays}
                </p>
                <Button className="bg-[#28a99e] hover:bg-blue-700 text-white">
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
