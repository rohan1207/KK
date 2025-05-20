export default function BusinessHours() {
  return (
    <div className="mt-[95px]">
      <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
      <ul className="text-gray-600 space-y-2">
        <li>
          Monday - Friday:{" "}
          <span className="font-semibold">9:00 AM - 6:00 PM</span>
        </li>
        <li>
          Saturday: <span className="font-semibold">10:00 AM - 4:00 PM</span>
        </li>
        <li className="font-bold text-red-500">Sunday: Closed</li>
      </ul>
    </div>
  );
}
