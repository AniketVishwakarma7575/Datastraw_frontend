import { useCallback, useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout.jsx";
import Skeleton from "./components/ui/Skeleton.jsx";
import { addTicketNote, createTicket, getTicket, getTickets, updateTicketStatus } from "./lib/api.js";
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
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { toast } = useToast();

  const refreshTickets = useCallback(async () => {
    const data = await getTickets();
    setTickets(data);
  }, []);

  const refreshTicketDetail = useCallback(async (id) => {
    const ticket = await getTicket(id);
    setActiveTicket(ticket);
    return ticket;
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  useEffect(() => {
    refreshTickets()
      .catch((error) => toast("Couldn't load tickets", error.message, "error"))
      .finally(() => setLoading(false));
  }, [refreshTickets, toast]);

  useEffect(() => {
    if (route.page !== "detail") {
      setActiveTicket(null);
      setDetailLoading(false);
      return undefined;
    }

    let current = true;
    setActiveTicket(null);
    setDetailLoading(true);
    getTicket(route.ticketId)
      .then((ticket) => {
        if (current) setActiveTicket(ticket);
      })
      .catch((error) => {
        if (current) toast("Couldn't load ticket", error.message, "error");
      })
      .finally(() => {
        if (current) setDetailLoading(false);
      });

    return () => {
      current = false;
    };
  }, [route.page, route.ticketId, toast]);

  const navigate = useCallback((page, ticketId) => {
    const hash = page === "detail" ? `#/tickets/${encodeURIComponent(ticketId)}` : `#/${page}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    setRoute(readRoute());
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
      await Promise.all([refreshTickets(), refreshTicketDetail(id)]);
      toast("Status updated", `${id} is now ${status}.`);
    } catch (error) {
      toast("Couldn't update status", error.message, "error");
    }
  }

  async function handleAddNote(id, note) {
    try {
      await addTicketNote(id, note);
      toast("Note added", "Your internal note was saved to this ticket.");
    } catch (error) {
      toast("Couldn't add note", error.message, "error");
      return { success: false, error: error.message };
    }

    const refreshResults = await Promise.allSettled([refreshTickets(), refreshTicketDetail(id)]);
    const refreshFailure = refreshResults.find((result) => result.status === "rejected");
    if (refreshFailure) {
      toast(
        "Note saved, but refresh failed",
        refreshFailure.reason instanceof Error ? refreshFailure.reason.message : "Reload the ticket to see the latest activity.",
        "error",
      );
    }

    return { success: true };
  }

  return (
    <AppLayout
      page={route.page}
      ticketId={route.ticketId}
      onNavigate={navigate}
      onCreateTicket={() => setCreateOpen(true)}
    >
      {loading ? (
        <div className="loading-grid" aria-label="Loading tickets"><Skeleton /><Skeleton /><Skeleton /><Skeleton /></div>
      ) : route.page === "dashboard" ? (
        <Dashboard tickets={tickets} onCreateTicket={() => setCreateOpen(true)} />
      ) : route.page === "tickets" ? (
        <Tickets tickets={tickets} onOpenTicket={(id) => navigate("detail", id)} onCreateTicket={() => setCreateOpen(true)} />
      ) : route.page === "detail" && detailLoading ? (
        <div className="loading-grid" aria-label="Loading ticket"><Skeleton /></div>
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
