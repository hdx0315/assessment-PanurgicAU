
//frontend/pages/Home.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import dayjs from 'dayjs';
import { Calendar, Clock, BookOpen, Plus, Loader2 } from "lucide-react"
import Navbar from '../components/Navbar';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate time slots from 5 PM to 9 PM in 15-minute intervals
  const generateAllSlots = () => {
    const slots = [];
    const start = selectedDate.hour(17).minute(0).second(0); // 5 PM
    const end = selectedDate.hour(21).minute(0).second(0);   // 9 PM
    
    let current = start;
    while (current.isBefore(end)) {
      slots.push(current.format('HH:mm:ss'));
      current = current.add(15, 'minute');
    }
 //   console.log("generated slots", slots);
 //   console.log("generated slots type", typeof(slots.at(0)));
    return slots;
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/slots?date=${selectedDate.format('YYYY-MM-DD')}`);

    //    console.log("fetch res: ",res.data.time_slot)
      
      if (Array.isArray(res.data)) {
        setBookedSlots(res.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setBookedSlots([]);
      }
      
      } catch (err) {
        console.error('Error fetching slots:', err);

      } finally {
        setLoading(false);

      }
    };
    
    fetchBookedSlots();
  }, [selectedDate]);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-200 to-purple-200  p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-100 to-purple-100  rounded-xl shadow-lg overflow-hidden">

        <Navbar/>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Appointment Scheduler</h1>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/my-appointments")}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <BookOpen className="mr-2" size={20} />
                My Bookings
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

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Calendar Section */}
            <div className="w-full lg:w-1/3  bg-white/5   p-6 rounded-lg shadow-md">

              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700 ">
                <Calendar className="mr-2" size={24} />
                Select Date
              </h2>

              <input
                type="date"
                value={selectedDate.format("YYYY-MM-DD")}
                min={dayjs().format("YYYY-MM-DD")}
                onChange={(e) => setSelectedDate(dayjs(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Time Slots Section */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-700">
                <Clock className="mr-2" size={28} />
                Time Slots for {selectedDate.format("MMMM D, YYYY")}
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="animate-spin text-blue-500" size={48} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generateAllSlots().map((slotTime) => {
                    const isBooked = bookedSlots.includes(slotTime)
                    return (
                      <div
                        key={slotTime}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105
                          ${
                            isBooked
                              ? "bg-red-100 border-red-300 hover:bg-red-200"
                              : "bg-green-100 border-green-300 hover:bg-green-200"
                          }
                          border-2 shadow-sm`}
                      >

                        <div className="flex justify-between items-center">
                          <span className="font-medium text-lg">{slotTime.split(":").slice(0, 2).join(":")}</span>
                          <span
                            className={`text-sm font-semibold px-2 py-1 rounded ${isBooked ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}
                          >

                            {isBooked ? "Booked" : "Available"}
                            
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

