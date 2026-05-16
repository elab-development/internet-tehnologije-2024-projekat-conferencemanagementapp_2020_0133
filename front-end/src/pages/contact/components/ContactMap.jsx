import React from "react";

export default function ContactMap({ open, onClose, apiKey }) {
  if (!open) return null;

  // Vite uses import.meta.env
  const key = apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  if (!key) {
    console.error(
      "Google Maps API key missing. Set VITE_GOOGLE_MAPS_API_KEY in front-end/.env and restart the dev server."
    );
    return null;
  }

  const place = encodeURIComponent("Jove Ilica 154, Belgrade, Serbia");
  const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${place}&zoom=15&maptype=roadmap`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-lg shadow-lg w-[90vw] h-[80vh] max-w-4xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-lg font-semibold">Confe — Jove Ilica 154</h3>
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Open in Google Maps
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          title="Confe location"
          src={src}
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
