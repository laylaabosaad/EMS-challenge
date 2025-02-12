import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";

import "@schedule-x/theme-default/dist/calendar.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";

function CalendarApp() {
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
    events: [
      {
        id: 1,
        title: "Event 1",
        start: "2025-01-01 00:00",
        end: "2025-01-01 02:00",
        description:"testing"
      },
    ],
    selectedDate: "2025-01-01",
    plugins:[createEventModalPlugin()]
  });
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
