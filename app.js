(() => {
  const { buildClassLink, buildEventLink, parseLocalDateTime, addMinutes, DEFAULT_EVENT_DURATION_MINUTES } =
    window.CalendarLinks;

  const MONTH_LABELS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const ALL_CATEGORIES = "todos";

  const pad = (number) => String(number).padStart(2, "0");

  const createElement = (tag, { className, text, attributes } = {}, children = []) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    Object.entries(attributes || {}).forEach(([name, value]) => element.setAttribute(name, value));
    children.filter(Boolean).forEach((child) => element.append(child));
    return element;
  };

  const createLink = ({ label, href, className = "button button--small" }) =>
    createElement("a", { className, text: label, attributes: { href, target: "_blank", rel: "noopener" } });

  const buildWhatsappLink = (phone) => `https://wa.me/${phone.replace(/\D/g, "")}`;
  const buildInstagramLink = (handle) => `https://instagram.com/${handle.replace(/^@/, "")}`;

  const resolveEventRange = (danceEvent) => {
    const start = parseLocalDateTime(danceEvent.fecha, danceEvent.hora);
    const end = danceEvent.fechaFin
      ? parseLocalDateTime(danceEvent.fechaFin, "23:59")
      : addMinutes(start, danceEvent.duracionMinutos || DEFAULT_EVENT_DURATION_MINUTES);
    return { start, end };
  };

  const formatDay = (date) => `${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`;

  const formatEventDates = ({ start, end }, isMultiDay) => {
    if (!isMultiDay) return `${formatDay(start)} ${start.getFullYear()}`;
    const isSameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    if (isSameMonth) return `${start.getDate()}–${end.getDate()} ${MONTH_LABELS[end.getMonth()]} ${end.getFullYear()}`;
    return `${formatDay(start)} – ${formatDay(end)} ${end.getFullYear()}`;
  };

  const selectUpcomingEvents = ({ events, now }) =>
    events
      .map((danceEvent) => ({ danceEvent, ...resolveEventRange(danceEvent) }))
      .filter(({ end }) => end > now)
      .sort((a, b) => a.start - b.start);

  const filterByCategory = ({ upcomingEvents, category }) =>
    category === ALL_CATEGORIES
      ? upcomingEvents
      : upcomingEvents.filter(({ danceEvent }) => danceEvent.categoria === category);

  const buildEventJsonLd = ({ danceEvent, start, end }) => ({
    "@type": "Event",
    name: danceEvent.nombre,
    startDate: danceEvent.fechaFin ? danceEvent.fecha : `${danceEvent.fecha}T${danceEvent.hora}`,
    endDate: danceEvent.fechaFin || `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: danceEvent.descripcion,
    image: danceEvent.imagen ? new URL(danceEvent.imagen, document.baseURI).href : undefined,
    location: { "@type": "Place", name: danceEvent.lugar, address: danceEvent.ciudad },
    organizer: { "@type": "Organization", name: window.CONTENIDO.estudio.nombre },
    url: danceEvent.enlace || undefined,
  });

  const renderEventsJsonLd = ({ upcomingEvents }) => {
    const script = createElement("script", { attributes: { type: "application/ld+json", id: "events-jsonld" } });
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": upcomingEvents.map(buildEventJsonLd),
    });
    document.getElementById("events-jsonld")?.remove();
    document.head.append(script);
  };

  const createFlyer = (danceEvent) =>
    createElement("a", { className: "event-flyer", attributes: { href: danceEvent.imagen, target: "_blank", rel: "noopener", "aria-label": `Ver flyer de ${danceEvent.nombre}` } }, [
      createElement("img", {
        attributes: {
          src: danceEvent.imagen,
          alt: danceEvent.imagenAlt || `Flyer de ${danceEvent.nombre}`,
          width: "800",
          height: "1000",
          loading: "lazy",
          decoding: "async",
        },
      }),
    ]);

  const createEventCard = ({ danceEvent, start, end, timeZone, categoryLabels }) => {
    const isMultiDay = Boolean(danceEvent.fechaFin);
    return createElement("article", { className: "event-card" }, [
      danceEvent.imagen && createFlyer(danceEvent),
      createElement("div", { className: "event-body" }, [
        createElement("span", { className: "tag", text: categoryLabels[danceEvent.categoria] || "" }),
        createElement("h3", { text: danceEvent.nombre }),
        createElement("p", { className: "event-when", text: formatEventDates({ start, end }, isMultiDay) + (isMultiDay || !danceEvent.hora ? "" : ` · ${danceEvent.hora}`) }),
        createElement("p", { className: "event-where", text: [danceEvent.lugar, danceEvent.ciudad].filter(Boolean).join(" · ") }),
        danceEvent.descripcion && createElement("p", { className: "event-description", text: danceEvent.descripcion }),
        danceEvent.precio && createElement("p", { className: "event-price", text: danceEvent.precio }),
        createElement("div", { className: "event-actions" }, [
          createLink({ label: "Agregar al calendario", href: buildEventLink({ danceEvent, timeZone }) }),
          danceEvent.enlace && createLink({ label: "Más información", href: danceEvent.enlace, className: "button button--ghost button--small" }),
        ]),
      ]),
    ]);
  };

  const createClassCard = ({ danceClass, studioName, timeZone, now }) =>
    createElement("article", { className: "card" }, [
      danceClass.nivel && createElement("span", { className: "tag", text: danceClass.nivel }),
      createElement("h3", { text: danceClass.nombre }),
      createElement("div", { className: "card-schedule", text: `${danceClass.dia} · ${danceClass.hora}` }),
      createElement("p", { text: danceClass.descripcion }),
      createElement("div", { className: "card-meta", text: [danceClass.lugar, danceClass.precio].filter(Boolean).join(" · ") }),
      createLink({ label: "Agendar en Google Calendar", href: buildClassLink({ danceClass, studioName, timeZone, now }) }),
    ]);

  const renderStudio = ({ studio }) => {
    document.getElementById("studio-name").textContent = studio.nombre;
    document.getElementById("studio-title").textContent = studio.titulo;
    document.getElementById("studio-tagline").textContent = studio.lema;
    document.getElementById("studio-description").textContent = studio.descripcion;
    document.getElementById("footer-text").textContent = `© ${new Date().getFullYear()} ${studio.nombre}`;
  };

  const renderClasses = ({ classes, studioName, timeZone, now }) => {
    document
      .getElementById("classes-list")
      .replaceChildren(...classes.map((danceClass) => createClassCard({ danceClass, studioName, timeZone, now })));
  };

  const renderEventCards = ({ upcomingEvents, category, timeZone, categoryLabels }) => {
    const cards = filterByCategory({ upcomingEvents, category }).map((item) =>
      createEventCard({ ...item, timeZone, categoryLabels })
    );
    const emptyState = createElement("p", { className: "empty-state", text: "Pronto anunciaremos nuevos eventos en esta categoría." });
    document.getElementById("events-list").replaceChildren(...(cards.length ? cards : [emptyState]));
  };

  const renderEventFilters = ({ upcomingEvents, categoryLabels, onSelect }) => {
    const availableCategories = new Set(upcomingEvents.map(({ danceEvent }) => danceEvent.categoria));
    const options = [[ALL_CATEGORIES, "Todos"], ...Object.entries(categoryLabels).filter(([key]) => availableCategories.has(key))];
    const container = document.getElementById("event-filters");
    const buttons = options.map(([key, label]) =>
      createElement("button", { className: "filter-chip", text: label, attributes: { type: "button", "data-category": key, "aria-pressed": String(key === ALL_CATEGORIES) } })
    );
    container.replaceChildren(...buttons);
    container.onclick = (clickEvent) => {
      const chip = clickEvent.target.closest("[data-category]");
      if (!chip) return;
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button === chip)));
      onSelect(chip.dataset.category);
    };
  };

  const renderEvents = ({ events, timeZone, categoryLabels, now }) => {
    const upcomingEvents = selectUpcomingEvents({ events, now });
    const showCategory = (category) => renderEventCards({ upcomingEvents, category, timeZone, categoryLabels });
    renderEventFilters({ upcomingEvents, categoryLabels, onSelect: showCategory });
    showCategory(ALL_CATEGORIES);
    renderEventsJsonLd({ upcomingEvents });
  };

  const renderCalendar = ({ calendar }) => {
    const buttons = [
      calendar.urlReservas && createLink({ label: "Reservar una clase", href: calendar.urlReservas, className: "button" }),
      calendar.urlPublica && createLink({ label: "Ver calendario completo", href: calendar.urlPublica, className: "button button--ghost" }),
    ];
    document.getElementById("calendar-actions").replaceChildren(...buttons.filter(Boolean));
    if (!calendar.urlIncrustada) return;
    const frame = createElement("iframe", {
      attributes: { src: calendar.urlIncrustada, title: "Calendario de clases y eventos", loading: "lazy" },
    });
    document.getElementById("calendar-frame").replaceChildren(frame);
  };

  const renderContact = ({ contact }) => {
    const items = [
      contact.whatsapp && { label: "WhatsApp", href: buildWhatsappLink(contact.whatsapp), text: "Escríbenos" },
      contact.instagram && { label: "Instagram", href: buildInstagramLink(contact.instagram), text: `@${contact.instagram.replace(/^@/, "")}` },
      contact.email && { label: "Email", href: `mailto:${contact.email}`, text: contact.email },
    ].filter(Boolean);
    const rows = items.map(({ label, href, text }) =>
      createElement("li", {}, [`${label}: `, createLink({ label: text, href, className: "" })])
    );
    const address = contact.direccion && createElement("li", { text: `Dirección: ${contact.direccion}` });
    document.getElementById("contact-list").replaceChildren(...rows, ...(address ? [address] : []));
  };

  const renderPage = ({ content, now }) => {
    const timeZone = content.estudio.zonaHoraria;
    renderStudio({ studio: content.estudio });
    renderClasses({ classes: content.clases, studioName: content.estudio.nombre, timeZone, now });
    renderEvents({ events: content.eventos, timeZone, categoryLabels: content.categoriasEventos, now });
    renderCalendar({ calendar: content.calendario });
    renderContact({ contact: content.contacto });
  };

  renderPage({ content: window.CONTENIDO, now: new Date() });
})();
