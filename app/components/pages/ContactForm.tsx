"use client";

import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";
import { emailConfig, isEmailConfigValid } from "@/lib/emailjs.config";

type ContactFormProps = {
  headline: string;
  description: string;
};

export default function ContactForm({
  headline,
  description,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if EmailJS is configured
    if (!isEmailConfigValid()) {
      console.error("EmailJS is not configured. Please add your credentials to .env file.");
      alert("Email service is not configured. Please contact the administrator.");
      return;
    }

    setStatus("sending");

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "MJey.dev",
        },
        emailConfig.publicKey
      );

      if (result.status === 200) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-incognito text-3xl font-bold tracking-tight mb-3">
          {headline}
        </h2>
        <p className="text-sm dark:text-zinc-400 text-zinc-600">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400/50 dark:focus:border-green-400/50 focus:border-green-400 transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400/50 dark:focus:border-green-400/50 focus:border-green-400 transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400/50 dark:focus:border-green-400/50 focus:border-green-400 transition-all"
            placeholder="How can I help you?"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-green-400/50 dark:focus:border-green-400/50 focus:border-green-400 transition-all resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group w-full px-6 py-4 bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white dark:text-zinc-900 font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending...
            </>
          ) : status === "success" ? (
            <>
              <span>✓</span>
              Message Sent!
            </>
          ) : status === "error" ? (
            <>
              <span>✗</span>
              Failed to Send
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
