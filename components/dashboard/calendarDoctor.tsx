"use client";
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export function CalendarDoctor() {
  const [events] = useState([
    {
      title: 'Dr. Smith - Available',
      start: '2025-03-13T10:00:00',
      end: '2025-04-13T11:00:00',
      backgroundColor: '#10B981',
      borderColor: '#059669'
    },
    {
      title: 'Dr. Smith - Booked',
      start: '2025-03-13T10:00:00',
      end: '2025-04-13T11:00:00',
      backgroundColor: '#EF4444',
      borderColor: '#DC2626'
    }
  ]);

  const renderDayCellContent = (arg: any) => {
    const eventsOnDay = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === arg.date.toDateString();
    });

    return (
      <div className="h-full">
        <div className="text-right">{arg.dayNumberText}</div>
        {eventsOnDay.map((event, index) => (
          <div
            key={index}
            className="text-xs p-1 mt-1 rounded"
            style={{ backgroundColor: event.backgroundColor }}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor's Schedule</h1>
          <div className="calendar-container min-h-[700px]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
              }}
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              nowIndicator={true}
              height="100%"
              slotEventOverlap={false}
              allDaySlot={false}
              slotDuration="00:30:00"
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false
              }}
              titleFormat={{ year: 'numeric', month: 'long' }}
              buttonText={{
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day'
              }}
              // Custom styling
              contentHeight="auto"
              stickyHeaderDates={true}
              // dayCellContent={renderDayCellContent}
              viewDidMount={(view) => {
                // Adjust cell heights for month view
                if (view.view.type === 'dayGridMonth') {
                  document.querySelectorAll('.fc-daygrid-day').forEach(el => {
                    (el as HTMLElement).style.height = '120px';
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .fc {
          --fc-border-color: #e5e7eb;
          --fc-button-bg-color: #4F46E5;
          --fc-button-border-color: #4F46E5;
          --fc-button-hover-bg-color: #4338CA;
          --fc-button-hover-border-color: #4338CA;
          --fc-today-bg-color: #EEF2FF;
        }
        .fc-button {
          padding: 0.5rem 1rem !important;
          font-weight: 500 !important;
          border-radius: 0.375rem !important;
        }
        .fc-day-today {
          background: var(--fc-today-bg-color) !important;
        }
        .fc-timegrid-slot {
          height: 40px !important;
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border-color: var(--fc-border-color);
        }
        .fc-daygrid-day-events {
          margin-top: 0 !important;
        }
        .fc-daygrid-day-frame {
          min-height: 100px !important;
        }
      `}</style>
    </div>
  );
}