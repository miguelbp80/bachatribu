window.CalendarLinks = (() => {
  const WEEKDAYS = {
    domingo: { index: 0, code: "SU" },
    lunes: { index: 1, code: "MO" },
    martes: { index: 2, code: "TU" },
    miercoles: { index: 3, code: "WE" },
    jueves: { index: 4, code: "TH" },
    viernes: { index: 5, code: "FR" },
    sabado: { index: 6, code: "SA" },
  };

  const MINUTES_PER_WEEK = 7 * 24 * 60;
  const DEFAULT_EVENT_DURATION_MINUTES = 180;

  const pad = (number) => String(number).padStart(2, "0");

  const normalizeWeekdayName = (name) =>
    name.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();

  const parseLocalDateTime = (isoDate, time = "00:00") => {
    const [year, month, day] = isoDate.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

  const formatDateStamp = (date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;

  const formatDateTimeStamp = (date) => `${formatDateStamp(date)}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

  const findNextWeekdayStart = ({ weekdayIndex, time, now }) => {
    const [hours, minutes] = time.split(":").map(Number);
    const daysAhead = (weekdayIndex - now.getDay() + 7) % 7;
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysAhead, hours, minutes);
    return candidate > now ? candidate : addMinutes(candidate, MINUTES_PER_WEEK);
  };

  const buildGoogleCalendarLink = ({ title, dates, location, details, timeZone, recurrenceRule }) => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates,
      ctz: timeZone,
      location: location || "",
      details: details || "",
    });
    if (recurrenceRule) params.set("recur", recurrenceRule);
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const buildClassLink = ({ danceClass, studioName, timeZone, now }) => {
    const weekday = WEEKDAYS[normalizeWeekdayName(danceClass.dia)];
    if (!weekday) return "";
    const start = findNextWeekdayStart({ weekdayIndex: weekday.index, time: danceClass.hora, now });
    return buildGoogleCalendarLink({
      title: `${danceClass.nombre} · ${studioName}`,
      dates: `${formatDateTimeStamp(start)}/${formatDateTimeStamp(addMinutes(start, danceClass.duracionMinutos))}`,
      location: danceClass.lugar,
      details: danceClass.descripcion,
      timeZone,
      recurrenceRule: `RRULE:FREQ=WEEKLY;BYDAY=${weekday.code}`,
    });
  };

  const buildAllDayDates = ({ fecha, fechaFin }) => {
    const firstDay = parseLocalDateTime(fecha);
    const dayAfterLastDay = addMinutes(parseLocalDateTime(fechaFin), 24 * 60);
    return `${formatDateStamp(firstDay)}/${formatDateStamp(dayAfterLastDay)}`;
  };

  const buildTimedDates = ({ fecha, hora, duracionMinutos }) => {
    const start = parseLocalDateTime(fecha, hora);
    const end = addMinutes(start, duracionMinutos || DEFAULT_EVENT_DURATION_MINUTES);
    return `${formatDateTimeStamp(start)}/${formatDateTimeStamp(end)}`;
  };

  const buildEventLink = ({ danceEvent, timeZone }) =>
    buildGoogleCalendarLink({
      title: danceEvent.nombre,
      dates: danceEvent.fechaFin ? buildAllDayDates(danceEvent) : buildTimedDates(danceEvent),
      location: [danceEvent.lugar, danceEvent.ciudad].filter(Boolean).join(", "),
      details: danceEvent.descripcion,
      timeZone,
    });

  return { buildClassLink, buildEventLink, parseLocalDateTime, addMinutes, DEFAULT_EVENT_DURATION_MINUTES };
})();
