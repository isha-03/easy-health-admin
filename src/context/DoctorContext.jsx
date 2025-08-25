import { createContext, useState } from "react";
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

// Static mock data for doctor
const staticProfileData = {
    _id: '1',
    name: 'Dr. Richard James',
    email: 'richard@example.com',
    image: 'https://via.placeholder.com/300/0000FF/808080?Text=Dr.Richard',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Richard has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Richard has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { 
        line1: '17th Cross, Richmond', 
        line2: 'Circle, Ring Road, London' 
    },
    available: true
};

const staticAppointments = [
    {
        _id: '1',
        userData: {
            name: 'Richard James',
            image: 'https://via.placeholder.com/50/FFFF00/000000?Text=RJ',
            dob: '1990-05-15'
        },
        slotDate: '24_08_2025',
        slotTime: '10:00 AM',
        amount: 50,
        cancelled: false,
        isCompleted: false,
        payment: true
    },
    {
        _id: '2',
        userData: {
            name: 'John Doe',
            image: 'https://via.placeholder.com/50/FF00FF/FFFFFF?Text=JD',
            dob: '1985-08-20'
        },
        slotDate: '25_08_2025',
        slotTime: '2:00 PM',
        amount: 50,
        cancelled: false,
        isCompleted: true,
        payment: false
    },
    {
        _id: '3',
        userData: {
            name: 'Jane Smith',
            image: 'https://via.placeholder.com/50/00FFFF/000000?Text=JS',
            dob: '1992-03-10'
        },
        slotDate: '26_08_2025',
        slotTime: '11:30 AM',
        amount: 50,
        cancelled: false,
        isCompleted: false,
        payment: true
    },
    {
        _id: '4',
        userData: {
            name: 'Alice Brown',
            image: 'https://via.placeholder.com/50/FF6B6B/FFFFFF?Text=AB',
            dob: '1988-12-05'
        },
        slotDate: '27_08_2025',
        slotTime: '9:00 AM',
        amount: 50,
        cancelled: true,
        isCompleted: false,
        payment: true
    },
    {
        _id: '5',
        userData: {
            name: 'Mike Wilson',
            image: 'https://via.placeholder.com/50/4ECDC4/FFFFFF?Text=MW',
            dob: '1995-07-18'
        },
        slotDate: '28_08_2025',
        slotTime: '3:30 PM',
        amount: 50,
        cancelled: false,
        isCompleted: true,
        payment: false
    }
];

const staticDashData = {
    earnings: 2500,
    appointments: 25,
    patients: 180,
    latestAppointments: staticAppointments
};

const DoctorContextProvider = (props) => {
    const [dToken] = useState('demo-token') // Always authenticated
    const [appointments, setAppointments] = useState(staticAppointments)
    const [dashData, setDashData] = useState(staticDashData)
    const [profileData, setProfileData] = useState(staticProfileData)
    const backendUrl = 'http://localhost:4000' // Not used

    // Mock functions that work instantly
    const getAppointments = () => {
        // Already loaded, just show success
        toast.success('Appointments loaded successfully')
    }

    const getProfileData = () => {
        // Already loaded
        console.log('Profile data loaded')
    }

    const cancelAppointment = (appointmentId) => {
        const updatedAppointments = appointments.map(apt => 
            apt._id === appointmentId ? { ...apt, cancelled: true } : apt
        )
        setAppointments(updatedAppointments)
        
        // Update dashboard data
        setDashData(prev => ({
            ...prev,
            latestAppointments: updatedAppointments
        }))
        
        toast.success('Appointment cancelled')
    }

    const completeAppointment = (appointmentId) => {
        const updatedAppointments = appointments.map(apt => 
            apt._id === appointmentId ? { ...apt, isCompleted: true } : apt
        )
        setAppointments(updatedAppointments)
        
        // Update dashboard data  
        setDashData(prev => ({
            ...prev,
            latestAppointments: updatedAppointments
        }))
        
        toast.success('Appointment completed')
    }

    const getDashData = () => {
        // Already loaded
        console.log('Dashboard data loaded')
    }

    const value = {
        dToken, 
        setDToken: () => {}, // No-op
        backendUrl,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, 
        getDashData,
        profileData, 
        setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider