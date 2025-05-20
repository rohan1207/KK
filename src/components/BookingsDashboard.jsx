import { useState, useEffect } from "react";

const CalendlyBooking = () => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const apiKey =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQeyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyOTM1MjY0LCJqdGkiOiJmMjRjOTRlZS00ZTFiLTQzNGItYTZlNC02OWE1YTY5YmIyNTYiLCJ1c2VyX3V1aWQiOiI4MzMxZDk4NC1mZGUyLTRlMDctODMwYi1kYjdjODE3ODRlMGMifQPLXT2ATRvf2pEOcb00kjnGgkdelBDchF7WhqUug6jZfSbTiX4TBqJMPNu2t9LH4lvHhRXEsthtOV9_LJ9J1dZg";

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableTimes = async (date) => {
    try {
      const response = await fetch(
        "https://api.calendly.com/scheduled_events",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const events = data.collection.filter((event) =>
        event.start_time.startsWith(date)
      );
      setAvailableTimes(events.map((event) => event.start_time));
    } catch (error) {
      console.error("Error fetching times:", error);
    }
  };

  const handleBooking = (time) => {
    window.open(
      `https://calendly.com/YOUR_USERNAME?date=${selectedDate}&time=${time}`,
      "_blank"
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Book Your Consultation</h2>
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded"
      />
      <div className="mt-4">
        <h3 className="font-medium">Available Times</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => handleBooking(time)}
                className="border p-2 rounded hover:bg-gray-200"
              >
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))
          ) : (
            <p>No available slots</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendlyBooking;
