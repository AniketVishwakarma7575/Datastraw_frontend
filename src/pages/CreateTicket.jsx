import { useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";

const initialForm = { customer: "", email: "", subject: "", desc: "" };

export default function CreateTicket({ onClose, onCreate }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onCreate(form);
    } catch (createError) {
      setError(createError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="create-ticket-title">
      <form onSubmit={submit}>
        <div className="modal-head">
          <h2 className="modal-title" id="create-ticket-title">Create ticket</h2>
          <p className="modal-sub">Capture the issue clearly so your team can resolve it quickly.</p>
        </div>
        <div className="modal-body">
          <Input label="Customer name" name="customer" autoComplete="name" placeholder="Jordan Lee" value={form.customer} onChange={updateField} />
          <Input label="Customer email" name="email" type="email" autoComplete="email" placeholder="jordan@example.com" value={form.email} onChange={updateField} />
          <Input label="Subject" name="subject" placeholder="Brief summary of the issue" value={form.subject} onChange={updateField} required />
          <div className="field">
            <label htmlFor="ticket-description">Description</label>
            <textarea id="ticket-description" name="desc" placeholder="What happened, and what has the customer already tried?" value={form.desc} onChange={updateField} />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>
        <div className="modal-foot">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Creating..." : "Create ticket"}</Button>
        </div>
      </form>
    </Modal>
  );
}
