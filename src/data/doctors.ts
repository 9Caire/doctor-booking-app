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
        {
            id: "eley-toney",
            name: "Dr. Eley Toney",
            specialty: "Cardiologist",
            workdays: "Monday, Tuesday, Wednesday from 6pm to 9pm",
            image: "/images/doctors/doctor8.jpg",
            experience: "14 Years",
            about: "Dr. Eley Toney is committed to delivering high-quality cardiac care using the latest technologies."
        },
        {
            id: "kristina-liao",
            name: "Dr. Kristina Liao",
            specialty: "Cardiologist",
            workdays: "Tuesday and Wednesday from 1pm to 5pm",
            image: "/images/doctors/doctor9.jpg",
            experience: "11 Years",
            about: "Dr. Kristina Liao specializes in pediatric cardiology and congenital heart defects."
        },
        {
            id: "aasmaan-singh",
            name: "Dr. Aasmaan Singh",
            specialty: "Cardiologist",
            workdays: "Saturday and Sunday from 5pm to 7pm",
            image: "/images/doctors/doctor3.jpg",
            experience: "7 Years",
            about: "Dr. Aasmaan Singh is a young and dynamic cardiologist with a passion for community health."
        },
    ],
};
