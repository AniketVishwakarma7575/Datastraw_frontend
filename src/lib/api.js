const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json();

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || `Request failed with status ${response.status}.`);
  }

  return payload.data;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function normalizeTicket(ticket) {
  return {
    id: ticket.ticketId,
    customer: ticket.customerName,
    email: ticket.customerEmail,
    subject: ticket.subject,
    status: ticket.status,
    created: formatDate(ticket.createdAt),
    updated: formatDate(ticket.updatedAt),
    desc: ticket.description,
    timeline: [
      {
        actor: "System",
        action: "Ticket created",
        time: formatDate(ticket.createdAt),
        type: "system",
      },
    ],
  };
}

export async function getTickets() {
  const tickets = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await request(`/tickets?page=${page}&limit=100`);
    if (!result || !Array.isArray(result.tickets) || !result.pagination) {
      throw new Error("The tickets API returned an invalid response.");
    }

    tickets.push(...result.tickets.map(normalizeTicket));
    totalPages = Number(result.pagination.totalPages);
    if (!Number.isInteger(totalPages) || totalPages < 0) {
      throw new Error("The tickets API returned invalid pagination data.");
    }
    page += 1;
  } while (page <= totalPages);

  return tickets;
}

export async function getTicket(id) {
  const [ticket, notes] = await Promise.all([
    request(`/tickets/${encodeURIComponent(id)}`),
    request(`/tickets/${encodeURIComponent(id)}/notes`),
  ]);

  if (!ticket || !Array.isArray(notes)) {
    throw new Error("The ticket API returned an invalid response.");
  }

  const normalized = normalizeTicket(ticket);
  normalized.timeline.push(
    ...notes
      .map((note) => ({
        actor: "Aniket Vishwakarma",
        action: "Added internal note",
        content: note.noteText,
        time: formatDate(note.createdAt),
        type: "note",
        createdAt: new Date(note.createdAt).getTime(),
      }))
      .sort((first, second) => first.createdAt - second.createdAt)
      .map(({ createdAt, ...event }) => event),
  );

  return normalized;
}

export async function createTicket({ customer, email, subject, desc }) {
  const customerName = customer.trim();
  const customerEmail = email.trim();
  const description = desc.trim();

  if (!customerName || !customerEmail || !subject.trim() || !description) {
    throw new Error("Complete all ticket fields before continuing.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw new Error("Enter a valid customer email address.");
  }

  const ticket = await request("/tickets", {
    method: "POST",
    body: JSON.stringify({
      customerName,
      customerEmail,
      subject: subject.trim(),
      description,
    }),
  });

  if (!ticket) {
    throw new Error("The ticket API did not return the created ticket.");
  }

  return normalizeTicket(ticket);
}

export async function updateTicketStatus(id, status) {
  const ticket = await request(`/tickets/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

  if (!ticket) {
    throw new Error("The ticket API did not return the updated ticket.");
  }

  return normalizeTicket(ticket);
}

export async function addTicketNote(id, noteText) {
  const value = noteText.trim();
  if (!value) {
    throw new Error("Add a note before saving.");
  }

  const note = await request(`/tickets/${encodeURIComponent(id)}/notes`, {
    method: "POST",
    body: JSON.stringify({ noteText: value }),
  });

  if (!note) {
    throw new Error("The notes API did not return the saved note.");
  }

  return note;
}
