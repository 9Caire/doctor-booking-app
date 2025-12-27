export interface Specialty {
    id: string;
    name: string;
    icon: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    clinic: string;
    rating: number;
    reviewCount: number;
    image: string;
    availability: {
        status: "Available Today" | "Available Tomorrow" | "Next Available";
        date?: string;
    };
}

export const specialties: Specialty[] = [
    { id: "1", name: "Cardiology", icon: "HeartPulse" },
    { id: "2", name: "Endocrinology", icon: "Stethoscope" },
    { id: "3", name: "Orthopedics", icon: "Bone" },
    { id: "4", name: "Dermatology", icon: "Sparkles" },
    { id: "5", name: "Pediatrics", icon: "Baby" },
    { id: "6", name: "Psychiatry", icon: "Brain" },
    { id: "7", name: "Opthalmology", icon: "Eye" },
    { id: "8", name: "ENT", icon: "Baby" }
];

export const topDoctors: Doctor[] = [
    {
        id: "1",
        name: "Dr. Rohan Mehta",
        specialty: "Cardiologist",
        clinic: "Kuwait Heart Center",
        rating: 4.9,
        reviewCount: 120,
        image: "/images/doctors/doctor4.jpg",
        availability: { status: "Available Today" },
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        specialty: "Psychiatrist",
        clinic: "Smile Dental Clinic",
        rating: 4.8,
        reviewCount: 85,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
        availability: { status: "Available Tomorrow" },
    },
    {
        id: "3",
        name: "Dr. Elena Rodriguez",
        specialty: "Dermatologist",
        clinic: "Skin & Care Institute",
        rating: 4.7,
        reviewCount: 95,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
        availability: { status: "Next Available", date: "Oct 25" },
    },
    {
        id: "4",
        name: "Dr. Michael Chen",
        specialty: "Orthopedic",
        clinic: "Joint & Bone Clinic",
        rating: 4.9,
        reviewCount: 150,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
        availability: { status: "Available Today" },
    },
];
