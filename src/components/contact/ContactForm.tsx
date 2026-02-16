"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-5xl mb-4">&#10003;</div>
        <h3 className="text-2xl font-heading font-bold mb-2">Message sent!</h3>
        <p className="text-fog">Thanks for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-violet hover:text-violet-hover transition-colors duration-300 font-medium cursor-pointer"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-fog mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-charcoal border border-ash text-snow placeholder-fog/50 focus:outline-none focus:border-violet transition-colors duration-300"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-fog mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-charcoal border border-ash text-snow placeholder-fog/50 focus:outline-none focus:border-violet transition-colors duration-300"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-fog mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-charcoal border border-ash text-snow placeholder-fog/50 focus:outline-none focus:border-violet transition-colors duration-300 resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      {status === "error" && (
        <p className="text-coral text-sm">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
