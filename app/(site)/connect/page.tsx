import ConnectForm from "@/components/connect/ConnectForm";

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Intro + contacts */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-5">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Connect</h1>
          <p className="mt-4 text-gray-700 leading-7">
            Tell us about your project. We’ll follow up with samples, timelines, and next steps.
          </p>

          {/* Key contacts (no headshots yet; easy to add later) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm text-gray-500">Primary Contact</div>
              <div className="mt-1 font-medium">Matthew</div>
              <div className="text-sm text-gray-600">TCC Carpets</div>
              {/* <div className="mt-3 h-10 w-10 rounded-full bg-gray-200" /> ← headshot placeholder */}
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm text-gray-500">Co-Contact</div>
              <div className="mt-1 font-medium">Ling</div>
              <div className="text-sm text-gray-600">TCC Carpets</div>
              {/* <div className="mt-3 h-10 w-10 rounded-full bg-gray-200" /> */}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <ConnectForm />
        </div>
      </header>
    </div>
  );
}
