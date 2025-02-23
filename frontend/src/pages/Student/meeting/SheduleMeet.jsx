import React from "react";

const SheduleMeet = () => {

    const data = [
        {
            title: "Schedule a Meeting",
            description: "Schedule a meeting with your teacher",
            date: "2024-01-01",
            time: "10:00 AM",
            duration: "1 hour",
            participants: ["John Doe", "Jane Smith"],
            status: "pending",
        },
        {
            title: "Schedule a Meeting",
            description: "Schedule a meeting with your teacher",
            date: "2024-01-01",
            time: "10:00 AM",
            duration: "1 hour",
            participants: ["John Doe", "Jane Smith"],
            status: "pending",
        },
        {
            title: "Schedule a Meeting",
            description: "Schedule a meeting with your teacher",
            date: "2024-01-01",
            time: "10:00 AM",
            duration: "1 hour",
            participants: ["John Doe", "Jane Smith"],
            status: "pending",
        },
        {
            title: "Schedule a Meeting",
            description: "Schedule a meeting with your teacher",
            date: "2024-01-01",
            time: "10:00 AM",
            duration: "1 hour",
            participants: ["John Doe", "Jane Smith"],
            status: "pending",
        },


    ]

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Scheduled Meetings</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((meeting, index) => (
                    <div key={index} className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6 hover:border-blue-500 transition-all">
                      <h2 className="text-xl font-semibold text-white mb-3">{meeting.title}</h2>
                      <p className="text-blue-400 mb-4">{meeting.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-300">
                          <span className="font-medium w-24">Date:</span>
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="font-medium w-24">Time:</span>
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="font-medium w-24">Duration:</span>
                          <span>{meeting.duration}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="font-medium text-gray-300 mb-2">Participants:</p>
                        <div className="flex flex-wrap gap-2">
                          {meeting.participants.map((participant, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-900/20 rounded-full text-blue-400 text-sm">
                              {participant}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="capitalize px-3 py-1 bg-blue-900/20 rounded-full text-blue-400 text-sm">
                          {meeting.status}
                        </span>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                          Join Meeting
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
    )
}

export default SheduleMeet;