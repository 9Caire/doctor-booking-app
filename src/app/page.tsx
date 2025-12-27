"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Stethoscope,
  HeartPulse,
  Bone,
  Sparkles,
  Baby,
  Brain,
  Eye,
  Ear,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import { specialties, topDoctors } from "@/data/mockData";
import DoctorCard from "@/components/DoctorCard";
import { useRouter } from "next/navigation";

const specialtyIcons: Record<string, any> = {
  Cardiology: HeartPulse,
  Dentistry: Stethoscope,
  Orthopedics: Bone,
  Dermatology: Sparkles,
  Pediatrics: Baby,
  Psychiatry: Brain,
  Opthalmology: Eye,
  ENT: Ear,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full z-10">
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

      {/* Specialties Section */}
      <section className="pt-40 pb-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Browse by Specialty</h2>
              <p className="text-gray-500 mt-2">Find the right specialist for your needs</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {specialties.map((spec) => {
              const Icon = specialtyIcons[spec.name] || Stethoscope;
              return (
                <div
                  key={spec.id}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer text-center"
                  onClick={() => router.push(`/doctors/${spec.name.toLowerCase()}`)}
                >
                  <div className="mx-auto h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {spec.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top Doctors</h2>
              <p className="text-gray-500 mt-2">Highly rated professionals trusted by thousands</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {topDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Footer */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">MOH Approved</h4>
                <p className="text-gray-400 text-sm">Certified by Ministry of Health Kuwait</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">HIPAA Compliant</h4>
                <p className="text-gray-400 text-sm">Your health data is safe and secure</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">ISO Certified</h4>
                <p className="text-gray-400 text-sm">International standards of quality</p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-6">
            <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
            <p className="text-gray-500 text-sm">
              © 2025 9cAIre. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
