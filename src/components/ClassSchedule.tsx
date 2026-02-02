import { Clock } from 'lucide-react';

interface Schedule {
  time: string;
  subject: string;
  teacher: string;
  class: string;
  avatar: string;
}

export default function ClassSchedule() {
  const schedules: Schedule[] = [
    {
      time: '08:30 - 09:30',
      subject: 'Mathematics',
      teacher: 'Sarah Johnson',
      class: 'Class 5-A',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      time: '09:30 - 10:30',
      subject: 'English',
      teacher: 'Michael Chen',
      class: 'Class 6-B',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      time: '10:45 - 11:45',
      subject: 'Science',
      teacher: 'Emily Davis',
      class: 'Class 7-A',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <img
              src={schedule.avatar}
              alt={schedule.teacher}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{schedule.subject}</h4>
              <p className="text-sm text-gray-600">{schedule.teacher}</p>
              <p className="text-xs text-gray-500">{schedule.class}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{schedule.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
