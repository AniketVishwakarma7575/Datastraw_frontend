import Button from "../components/ui/Button.jsx";

export default function NotFound({ onNavigate }) {
  return (
    <section className="not-found">
      <div className="not-found-code">404</div>
      <h1 className="page-title">Page not found</h1>
      <p className="page-sub">The page you're looking for doesn't exist.</p>
      <Button onClick={() => onNavigate("dashboard")}>Back to dashboard</Button>
    </section>
  );
}
