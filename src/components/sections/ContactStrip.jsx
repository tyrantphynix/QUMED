import React, { useState } from "react";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import styles from "./ContactStrip.module.css";

const USE_MAP_EMBED = import.meta.env.VITE_USE_MAP_EMBED === "true";
const MAPS_URL = "https://maps.google.com/?q=Qu-med+Disposable,+Sector+37,+Gurugram,+Haryana";

function ContactForm() {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT || "https://api.web3forms.com/submit";
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    if (accessKey) payload.access_key = accessKey;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Unable to send your message right now. Please email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please email us at info.qumed@yahoo.in");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIconBadge}>✓</div>
        <div className={styles.successContent}>
          <h3 className={styles.successHeading}>Message Sent Successfully!</h3>
          <p className={styles.successBody}>
            Thank you for reaching out. We have received your enquiry and our team will get back to you shortly.
          </p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => setStatus("idle")}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Web3Forms helper fields */}
      <input type="hidden" name="from_name" value="Qu-med Website Enquiry" />
      <input type="hidden" name="subject" value="New Contact Enquiry — Qu-med Website" />
      <input type="checkbox" name="botcheck" style={{ display: "none" }} />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Full name"
            className={styles.input}
            disabled={status === "submitting"}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={styles.input}
            disabled={status === "submitting"}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="How can we help? (e.g., bulk product order, catalogue request)"
          rows={5}
          className={styles.input}
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon}>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <span className={styles.spinner} />
            Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

export default function ContactStrip({ isFullPage = false }) {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });
  return (
    <section className={"section section--navy " + styles.section + " " + (isFullPage ? styles.sectionFull : "")} ref={ref} aria-labelledby="contact-heading">
      <div className={"container " + styles.grid}>
        {/* Left: form */}
        <div className="reveal">
          <p className={styles.eyebrow}>Contact Us</p>
          <h2 id="contact-heading" className={styles.heading}>We're ready. Let's talk.</h2>
          <p className={styles.sub}>Reach out for product enquiries, bulk orders, or catalogue requests.</p>
          <ContactForm />
        </div>

        {/* Right: info + map */}
        <div className={"reveal " + styles.infoCol}>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>Address</p>
                <p className={styles.infoText}>Plot No. 38, Udyog Vihar, Phase VI,<br />Sector 37, Gurugram, Haryana 122001</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <p className={styles.infoLabel}>Phone</p>
                <a href="tel:+919999113349" className={styles.infoLink}>+91-9999113349</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href="mailto:info.qumed@yahoo.in" className={styles.infoLink}>info.qumed@yahoo.in</a>
              </div>
            </div>
          </div>

          {/* Map block (Home page only) */}
          {!isFullPage && (
            <div className={styles.mapBlock}>
              <iframe
                title="Qu-med Disposable location"
                src="https://maps.google.com/maps?q=Qu-med+Disposable,+Sector+37,+Gurugram&output=embed"
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>

      {/* Map block (Contact page only - full width) */}
      {isFullPage && (
        <div className="container reveal">
          <div className={styles.mapBlockFull}>
            <iframe
              title="Qu-med Disposable location"
              src="https://maps.google.com/maps?q=Qu-med+Disposable,+Sector+37,+Gurugram&output=embed"
              className={styles.mapIframeFull}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </section>
  );
}
