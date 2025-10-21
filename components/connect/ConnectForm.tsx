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

const OFFICES = [
  {
    name: "TCC Carpets International Ltd.",
    lines: [
      "Flat 4–5, 14/F, Cheung Hing Building,",
      "540 Nathan Road, Yaumatei, Kowloon, Hong Kong",
    ],
    tel: "+852 2348 4848",
    fax: "+852 2782 2190",
    email: "matthewsu@tcc-carpets.com",
  },
  {
    name: "TCC Global Decor LLC",
    lines: ["777 Cloud Creek St.", "Henderson, NV 89011, USA"],
    tel: null,
    fax: null,
    email: "matthewsu@tcc-carpets.com", // ✅ updated email
  },
  {
    name: "TCC Carpets Manufacture Ltd.",
    lines: [
      "19 Andar C & D, Edif. Kin Heng Long Plaza,",
      "258 Alameda Dr. Carlos d'Assumpcao, Macau",
    ],
    tel: null,
    fax: null,
    email: "matthewsu@tcc-carpets.com",
  },
] as const;

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

    if (!data.name || !data.email || !data.message) {
      setError("Please fill in your name, email, and a short message.");
      return;
    }
    if (data.honey && data.honey.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    // DEMO: mark submitted without a backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section aria-label="Message received" className="space-y-3">
        <h2 className="text-xl font-semibold">Thanks — we’ve got it.</h2>
        <p className="text-neutral-700">
          We’ll reach out shortly. If it’s urgent, include “URGENT” in the subject and email us directly at{" "}
          <a href="mailto:info@tcc-carpets.com" className="underline underline-offset-2">
            info@tcc-carpets.com
          </a>.
        </p>
        <button
          type="button"
          className="mt-2 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
          onClick={() => {
            setSubmitted(false);
            setData(initial);
          }}
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <section aria-label="Contact TCC">
      {/* Offices (borderless, editorial spacing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {OFFICES.map((o) => (
          <div key={o.name}>
            <h3 className="text-base font-semibold">{o.name}</h3>
            <address className="mt-2 not-italic text-sm text-neutral-700 space-y-0.5">
              {o.lines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </address>
            <ul className="mt-3 space-y-1 text-sm">
              {o.tel && (
                <li>
                  <span className="text-neutral-500">Tel:</span>{" "}
                  <a
                    href={`tel:${o.tel.replace(/\s+/g, "")}`}
                    className="underline underline-offset-2 hover:text-amber-700"
                  >
                    {o.tel}
                  </a>
                </li>
              )}
              {o.fax && (
                <li>
                  <span className="text-neutral-500">Fax:</span> {o.fax}
                </li>
              )}
              {o.email && (
                <li>
                  <span className="text-neutral-500">Email:</span>{" "}
                  <a
                    href={`mailto:${o.email}`}
                    className="underline underline-offset-2 hover:text-amber-700"
                  >
                    {o.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Form (no borders/cards; just fields and space) */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-neutral-600">Name *</label>
            <input
              name="name"
              value={data.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600">Email *</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600">Company</label>
            <input
              name="company"
              value={data.company}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Company / Studio"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600">Phone (optional)</label>
            <input
              name="phone"
              value={data.phone}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="+1 ..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-600">Project Type</label>
            <select
              name="projectType"
              value={data.projectType}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <label className="block text-sm text-neutral-600">Message *</label>
            <textarea
              name="message"
              value={data.message}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={6}
              placeholder="Tell us about your project, timeline, and location."
              required
            />
          </div>

          {/* Honeypot (hidden) */}
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

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
          >
            Send message
          </button>
        </div>
      </form>
    </section>
  );
}
