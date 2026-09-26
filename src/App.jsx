import { useCallback, useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout.jsx";
import Skeleton from "./components/ui/Skeleton.jsx";
import { addTicketNote, createTicket, getTickets, updateTicketStatus } from "./lib/api.js";
import CreateTicket from "./pages/CreateTicket.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Settings from "./pages/Settings.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import Tickets from "./pages/Tickets.jsx";
import { useToast } from "./context/ToastContext.jsx";

function readRoute() {
  const [page, ticketId] = window.location.hash.replace(/^#\/?/, "").split("/");
  if (!page) return { page: "dashboard", ticketId: null };
  if (page === "tickets" && ticketId) return { page: "detail", ticketId: decodeURIComponent(ticketId) };
  if (["dashboard", "tickets", "settings"].includes(page)) return { page, ticketId: null };
  return { page: "not-found", ticketId: null };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const { toast } = useToast();

  const refreshTickets = useCallback(async () => {
    const data = await getTickets();
    setTickets(data);
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    refreshTickets()
      .catch((error) => toast("Couldn't load tickets", error.message, "error"))
      .finally(() => setLoading(false));
  }, [refreshTickets, toast]);

  const navigate = useCallback((page, ticketId) => {
    const hash = page === "detail" ? `#/tickets/${encodeURIComponent(ticketId)}` : `#/${page}`;
    if (window.location.hash === hash) setRoute(readRoute());
    else window.location.hash = hash;
  }, []);

  async function handleCreateTicket(form) {
    const ticket = await createTicket(form);
    await refreshTickets();
    setCreateOpen(false);
    toast("Ticket created", `${ticket.id} is ready to manage.`);
    navigate("detail", ticket.id);
  }

  async function handleStatusChange(id, status) {
    try {
      await updateTicketStatus(id, status);
      await refreshTickets();
      toast("Status updated", `${id} is now ${status}.`);
    } catch (error) {
      toast("Couldn't update status", error.message, "error");
    }
  }

  async function handleAddNote(id, note) {
    try {
      await addTicketNote(id, note);
      await refreshTickets();
      toast("Note added", "Your internal note was saved to this ticket.");
      return true;
    } catch (error) {
      toast("Couldn't add note", error.message, "error");
      return false;
    }
  }

  const activeTicket = tickets.find((ticket) => ticket.id === route.ticketId);

  return (
    <AppLayout page={route.page} ticketId={route.ticketId} onNavigate={navigate}>
      {loading ? (
        <div className="loading-grid" aria-label="Loading tickets"><Skeleton /><Skeleton /><Skeleton /><Skeleton /></div>
      ) : route.page === "dashboard" ? (
        <Dashboard onCreateTicket={() => setCreateOpen(true)} />
      ) : route.page === "tickets" ? (
        <Tickets tickets={tickets} onOpenTicket={(id) => navigate("detail", id)} onCreateTicket={() => setCreateOpen(true)} />
      ) : route.page === "detail" && activeTicket ? (
        <TicketDetail
          ticket={activeTicket}
          onBack={() => navigate("tickets")}
          onStatusChange={handleStatusChange}
          onAddNote={handleAddNote}
        />
      ) : route.page === "settings" ? (
        <Settings />
      ) : (
        <NotFound onNavigate={navigate} />
      )}
      {createOpen && <CreateTicket onClose={() => setCreateOpen(false)} onCreate={handleCreateTicket} />}
    </AppLayout>
  );
}
