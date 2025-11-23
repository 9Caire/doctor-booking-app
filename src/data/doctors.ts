export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    workdays: string;
    image: string;
    experience: string;
    about: string;
}

export const doctorsData: Record<string, Doctor[]> = {
    cardiology: [
        {
            id: "rohan-mehta",
            name: "Dr. Rohan Mehta",
            specialty: "Cardiologist",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/doctor4.jpg",
            experience: "15 Years",
            about: "Dr. Rohan Mehta is a renowned cardiologist with over 15 years of experience in treating complex heart conditions."
        },
        {
            id: "kavita-rao",
            name: "Dr. Kavita Rao",
            specialty: "Cardiologist",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/doctor2.webp",
            experience: "10 Years",
            about: "Dr. Kavita Rao specializes in preventive cardiology and heart health management."
        },
        {
            id: "sameer-khanna",
            name: "Dr. Sameer Khanna",
            specialty: "Cardiologist",
            workdays: "Saturday and Sunday from 5pm to 7pm",
            image: "/images/doctors/doctor3.jpg",
            experience: "8 Years",
            about: "Dr. Sameer Khanna is dedicated to providing comprehensive cardiac care with a patient-centric approach."
        },
        {
            id: "rahul-kumar",
            name: "Dr. Rahul Kumar",
            specialty: "Cardiologist",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/doctor5.avif",
            experience: "12 Years",
            about: "Dr. Rahul Kumar has extensive experience in interventional cardiology."
        },
        {
            id: "mason-ray",
            name: "Dr. Mason Ray",
            specialty: "Cardiologist",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/doctor6.jpg",
            experience: "20 Years",
            about: "Dr. Mason Ray is a senior cardiologist known for his expertise in heart failure management."
        },
        {
            id: "karishma-khanna",
            name: "Dr. Karishma Khanna",
            specialty: "Cardiologist",
            workdays: "Saturday and Sunday from 5pm to 7pm",
            image: "/images/doctors/doctor7.jpg",
            experience: "9 Years",
            about: "Dr. Karishma Khanna focuses on women's heart health and non-invasive cardiology."
        },
    ],
    dermatology: [
        {
            id: "sunita-smith",
            name: "Dr. Sunita Smith",
            specialty: "Dermatologist",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/derm_docs/dermdoc1.jpg",
            experience: "15 Years",
            about: "Dr. Sunita Smith is a renowned dermatologist with over 15 years of experience in treating complex skin conditions."
        },
        {
            id: "ann-chovey",
            name: "Dr. Ann Chovey",
            specialty: "Dermatologist",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/derm_docs/dermdoc4.jpg",
            experience: "10 Years",
            about: "Dr. Ann Chovey specializes in preventive dermatology and skin health management."
        },
        {
            id: "anita-bath",
            name: "Dr. Anita Bath",
            specialty: "Dermatologist",
            workdays: "Saturday and Sunday from 5pm to 7pm",
            image: "/images/doctors/derm_docs/dermdoc5.jpg",
            experience: "8 Years",
            about: "Dr. Anita Bath is dedicated to providing comprehensive dermatological care with a patient-centric approach."
        },
    ],
    pediatrics: [
        {
            id: "bell-buttons",
            name: "Dr. Bell E. Buttons",
            specialty: "Pediatrician",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/pedia_docs/pediadoc1.jpg",
            experience: "15 Years",
            about: "Dr. Bell E. Buttons is a renowned pediatrician with over 15 years of experience in treating complex skin conditions."
        },
        {
            id: "elizabeth-jones",
            name: "Dr. Elizabeth Ann Jones",
            specialty: "Pediatrician",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/pedia_docs/pediadoc2.jpg",
            experience: "10 Years",
            about: "Dr. Elizabeth Ann Jones specializes in preventive pediatrics and pediatric health management."
        },
    ],
    orthopedics: [
        {
            id: "michael-johnson",
            name: "Dr. Michael Johnson",
            specialty: "Orthopedic Surgeon",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/ortho_docs/orthodoc1.jpg",
            experience: "15 Years",
            about: "Dr. Michael Johnson is a renowned orthopedic surgeon with over 15 years of experience in treating complex skin conditions."
        },
        {
            id: "joe-smith",
            name: "Dr. Joe Smith",
            specialty: "Orthopedic Surgeon",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/ortho_docs/orthodoc2.webp",
            experience: "10 Years",
            about: "Dr. Joe Smith specializes in preventive orthopedic surgery and orthopedic health management."
        },
    ],
    pyschiatry: [
        {
            id: "eley-toney",
            name: "Dr. Eley Toney",
            specialty: "Psychiatrist",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/doctor8.jpg",
            experience: "14 Years",
            about: "Dr. Eley Toney is committed to delivering high-quality psychiatric care using the latest technologies."
        },
        {
            id: "kristina-liao",
            name: "Dr. Kristina Liao",
            specialty: "Psychiatrist",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/doctor9.jpg",
            experience: "11 Years",
            about: "Dr. Kristina Liao specializes in pediatric psychiatry and congenital heart defects."
        },
        {
            id: "aasmaan-singh",
            name: "Dr. Aasmaan Singh",
            specialty: "Psychiatrist",
            workdays: "Saturday and Sunday from 5pm to 7pm",
            image: "/images/doctors/doctor3.jpg",
            experience: "7 Years",
            about: "Dr. Aasmaan Singh is a young and dynamic psychiatrist with a passion for community health."
        },
    ],
};
