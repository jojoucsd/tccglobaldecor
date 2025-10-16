"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  projectType: string;
  message: string;
  honey?: string; // honeypot
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  message: "",
  honey: "",
};

export default function ConnectForm() {
  const [data, setData] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Simple client-side validation
    if (!data.name || !data.email || !data.message) {
      setError("Please fill in your name, email, and a short message.");
      return;
    }
    // Honeypot check (bots often fill hidden fields)
    if (data.honey && data.honey.trim().length > 0) {
      // silently "succeed" to avoid hinting the trap
      setSubmitted(true);
      return;
    }

    // DEMO: mark submitted without a backend.
    // Later, wire this to:
    //  - a Next.js Route Handler (POST /api/connect),
    //  - Formspree / Airtable / Firebase,
    //  - or an email service (Resend, Sendgrid).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <h2 className="text-xl font-semibold text-green-700">Thanks — we’ve got it.</h2>
        <p className="mt-2 text-green-800">
          We’ll reach out shortly. If it’s urgent, include “URGENT” in the subject and email us directly.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
          onClick={() => {
            setSubmitted(false);
            setData(initial);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Name *</label>
          <input
            name="name"
            value={data.name}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Email *</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Company</label>
          <input
            name="company"
            value={data.company}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Company / Studio"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Phone (optional)</label>
          <input
            name="phone"
            value={data.phone}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="+1 ..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Project Type</label>
          <select
            name="projectType"
            value={data.projectType}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
          >
            <option value="">Select one (optional)</option>
            <option>Hotel</option>
            <option>Casino</option>
            <option>Cruise</option>
            <option>Aviation</option>
            <option>Yacht</option>
            <option>Retail</option>
            <option>Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Message *</label>
          <textarea
            name="message"
            value={data.message}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            rows={6}
            placeholder="Tell us about your project, timeline, and location."
            required
          />
        </div>

        {/* Honeypot (hidden from humans) */}
        <div className="hidden">
          <label>Do not fill this field</label>
          <input
            name="honey"
            value={data.honey}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Send message
        </button>
        <a
          href={`mailto:info@tcccarpets.com?subject=Project%20Enquiry&body=${encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nPhone: ${data.phone}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}`
          )}`}
          className="text-sm text-amber-700 hover:underline"
        >
          or email us directly
        </a>
      </div>
    </form>
  );
}
