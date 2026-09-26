import { mockTickets } from "../data/mockTickets.js";

const STORAGE_KEY = "supportflow-tickets";

function readTickets() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return mockTickets.map((ticket) => ({ ...ticket, timeline: [...ticket.timeline] }));
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new Error("Saved ticket data is invalid.");
    }
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Saved ticket data could not be read.", { cause: error });
    }
    throw error;
  }
}

function saveTickets(tickets) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export async function getTickets() {
  return readTickets();
}

export async function createTicket({ customer, email, subject, desc }) {
  const customerName = customer.trim() || "New customer";
  const customerEmail = email.trim() || "customer@example.com";
  const description = desc.trim() || "No description provided.";
  if (!subject.trim()) {
    throw new Error("Please add a subject before continuing.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw new Error("Enter a valid customer email address.");
  }

  const tickets = readTickets();
  const nextNumber = Math.max(
    24,
    ...tickets.map((ticket) => Number(ticket.id.replace(/\D/g, "")) || 0),
  ) + 1;
  const id = `TKT-${String(nextNumber).padStart(3, "0")}`;
  const ticket = {
    id,
    customer: customerName,
    email: customerEmail,
    subject: subject.trim(),
    status: "Open",
    updated: "Just now",
    created: "Just now",
    desc: description,
    timeline: [{ actor: "System", action: "Ticket created", time: "Just now", type: "system" }],
  };

  saveTickets([ticket, ...tickets]);
  return ticket;
}

export async function updateTicketStatus(id, status) {
  const tickets = readTickets();
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) {
    throw new Error("Ticket not found.");
  }

  const updatedTicket = {
    ...ticket,
    status,
    updated: "Just now",
    timeline: [
      ...ticket.timeline,
      {
        actor: "Aniket Vishwakarma",
        action: `Changed status to ${status}`,
        time: "Just now",
        type: "system",
      },
    ],
  };
  saveTickets(tickets.map((item) => (item.id === id ? updatedTicket : item)));
  return updatedTicket;
}

export async function addTicketNote(id, noteText) {
  const value = noteText.trim();
  if (!value) {
    throw new Error("Add a note before saving.");
  }

  const tickets = readTickets();
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) {
    throw new Error("Ticket not found.");
  }

  const updatedTicket = {
    ...ticket,
    updated: "Just now",
    timeline: [
      ...ticket.timeline,
      {
        actor: "Aniket Vishwakarma",
        action: "Added internal note",
        content: value,
        time: "Just now",
        type: "note",
      },
    ],
  };
  saveTickets(tickets.map((item) => (item.id === id ? updatedTicket : item)));
  return updatedTicket;
}
