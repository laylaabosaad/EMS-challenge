import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid, createViewWeek } from "@schedule-x/calendar";

import "@schedule-x/theme-default/dist/calendar.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";

function CalendarApp({ events }) {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events,

    plugins: [createEventModalPlugin()],

    selectedDate: new Date().toISOString().split("T")[0],
  });
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
