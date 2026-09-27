import { useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";

const initialForm = { customer: "", email: "", subject: "", desc: "" };

function validateForm(form) {
  const errors = {};
  const customer = form.customer.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const description = form.desc.trim();

  if (!customer) errors.customer = "Enter the customer's name.";
  if (!email) {
    errors.email = "Enter the customer's email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!subject) errors.subject = "Enter a subject.";
  if (!description) errors.desc = "Enter a description.";

  return errors;
}

export default function CreateTicket({ onClose, onCreate }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setFieldErrors(validationErrors);
    setSaving(true);
    setError("");

    if (Object.keys(validationErrors).length > 0) {
      setSaving(false);
      return;
    }

    try {
      await onCreate(form);
    } catch (createError) {
      setError(createError.message || "Could not create the ticket. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function fieldProps(name) {
    return {
      "aria-invalid": Boolean(fieldErrors[name]),
      "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <Modal onClose={onClose} labelledBy="create-ticket-title">
      <form onSubmit={submit} noValidate>
        <div className="modal-head">
          <h2 className="modal-title" id="create-ticket-title">Create ticket</h2>
          <p className="modal-sub">Capture the issue clearly so your team can resolve it quickly.</p>
        </div>
        <div className="modal-body">
          <Input label="Customer name" name="customer" autoComplete="name" placeholder="Jordan Lee" value={form.customer} onChange={updateField} disabled={saving} required {...fieldProps("customer")} />
          {fieldErrors.customer && <p className="field-error" id="customer-error" role="alert">{fieldErrors.customer}</p>}
          <Input label="Customer email" name="email" type="email" autoComplete="email" placeholder="jordan@example.com" value={form.email} onChange={updateField} disabled={saving} required {...fieldProps("email")} />
          {fieldErrors.email && <p className="field-error" id="email-error" role="alert">{fieldErrors.email}</p>}
          <Input label="Subject" name="subject" placeholder="Brief summary of the issue" value={form.subject} onChange={updateField} disabled={saving} required {...fieldProps("subject")} />
          {fieldErrors.subject && <p className="field-error" id="subject-error" role="alert">{fieldErrors.subject}</p>}
          <div className="field">
            <label htmlFor="ticket-description">Description</label>
            <textarea id="ticket-description" name="desc" placeholder="What happened, and what has the customer already tried?" value={form.desc} onChange={updateField} disabled={saving} required aria-invalid={Boolean(fieldErrors.desc)} aria-describedby={fieldErrors.desc ? "desc-error" : undefined} />
          </div>
          {fieldErrors.desc && <p className="field-error" id="desc-error" role="alert">{fieldErrors.desc}</p>}
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
