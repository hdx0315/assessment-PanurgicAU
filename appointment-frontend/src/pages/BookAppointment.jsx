import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import dayjs from 'dayjs';
import { Calendar, Clock, User, Mail, Phone, ArrowLeft, Check } from "lucide-react"
import Navbar from '../components/Navbar';


export default function BookAppointment() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Reuse slot generation from Home
  const generateAllSlots = () => {
    const slots = [];
    const start = selectedDate.hour(17).minute(0).second(0);
    const end = selectedDate.hour(21).minute(0).second(0);
    let current = start;
    while (current.isBefore(end)) {
      slots.push(current.format('HH:mm:ss'));
      current = current.add(15, 'minute');
    }
    return slots;
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/slots?date=${selectedDate.format('YYYY-MM-DD')}`);
        setBookedSlots(res.data);
      } catch (err) {
        console.error('Error fetching slots:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedSlots();
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        date: selectedDate.format('YYYY-MM-DD'),
        time_slot: selectedTime,
        contact_number: contactNumber
      });
      navigate('/my-appointments');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-200 to-purple-200  p-4 md:p-8">
      <div className="max-w-4xl mx-auto  bg-gradient-to-br from-blue-100 to-purple-100  rounded-xl shadow-lg overflow-hidden">
        
        <Navbar/>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">New Booking</h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <ArrowLeft className="mr-2" size={20} />
              Go Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute top-3 left-3 text-black" size={20} />
                  <input
                    type="date"
                    value={selectedDate.format("YYYY-MM-DD")}
                    min={dayjs().format("YYYY-MM-DD")}
                    onChange={(e) => setSelectedDate(dayjs(e.target.value))}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-48 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                  {generateAllSlots().map((slotTime) => {
                    const isBooked = bookedSlots.includes(slotTime)
                    const isSelected = selectedTime === slotTime

                    return (
                      <button
                        key={slotTime}
                        type="button"
                        onClick={() => !isBooked && setSelectedTime(slotTime)}
                        className={`p-2 text-sm rounded-lg transition duration-200 ease-in-out ${
                          isBooked
                            ? "bg-red-100 text-red-800 cursor-not-allowed"
                            : isSelected
                              ? "bg-green-500 text-white"
                              : "bg-green-100 border-2 border-green-300 hover:bg-green-300"
                        }`}
                        disabled={isBooked}
                      >
                        <Clock className="inline mr-1" size={14} />
                        {slotTime.split(":").slice(0, 2).join(":")}
                        {isBooked && " (Booked)"}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <User className="absolute top-3 left-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={user?.name || ""}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute top-3 left-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">10-digit phone number</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Check className="mr-2" size={20} />
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

