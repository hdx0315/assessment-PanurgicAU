
// src/pages/MyAppointments.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import dayjs from "dayjs"
import { Calendar, Clock, ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import Navbar from '../components/Navbar';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (err) {
      console.error('Error canceling appointment:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen   bg-gradient-to-br from-blue-200 to-purple-200  p-4 md:p-8">
      <div className="max-w-4xl mx-auto  bg-gradient-to-br from-blue-100 to-purple-100  rounded-xl shadow-lg overflow-hidden">

        <Navbar/>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Appointments</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Booking
              </button>
              <button
                onClick={() => navigate("/book-appointment")}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Plus className="mr-2" size={20} />
                Add Booking
              </button>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Calendar className="mx-auto mb-4" size={48} />
              <p className="text-xl">No appointments booked yet</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">

              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                        <Calendar className="mr-2" size={20} />
                        {dayjs(appointment.date).format("MMM D, YYYY")}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="mr-2" size={18} />
                        {appointment.time_slot.split(":").slice(0, 2).join(":")}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-300 ease-in-out"
                      aria-label="Cancel appointment"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

