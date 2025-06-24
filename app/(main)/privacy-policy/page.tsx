"use client";

import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-zinc-800 dark:text-zinc-100">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-base text-muted-foreground">
          Your privacy matters. This policy outlines how{" "}
          <strong>Langkahmu</strong> collects, uses, and safeguards your data.
        </p>
      </div>

      <Separator className="my-10" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>Personal Info:</strong> Name, email, and password when
            registering.
          </li>
          <li>
            <strong>Social Logins:</strong> Google profile (name, email,
            picture).
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, clicks, and other
            behavior metrics.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
          <li>To create and manage your account.</li>
          <li>To personalize and improve your experience.</li>
          <li>To troubleshoot issues and provide support.</li>
          <li>To analyze engagement and optimize features.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
        <p className="text-sm leading-relaxed">
          We <strong>don’t sell</strong> your data. We may share limited data
          with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>
            Trusted partners (e.g., authentication, analytics, database
            hosting).
          </li>
          <li>Authorities if legally required.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">4. Data Security</h2>
        <p className="text-sm leading-relaxed">
          We store your data securely using encryption and modern best
          practices. However, no method is 100% secure — use strong passwords
          and protect your account.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">5. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>Update or edit your account info.</li>
          <li>Request to delete your account & data.</li>
          <li>
            Decline promotional communications (we don’t send any by default).
          </li>
        </ul>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">6. Cookies & Tracking</h2>
        <p className="text-sm leading-relaxed">
          We use cookies and local storage to remember you and improve
          performance. You can disable these in your browser settings.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">7. Children’s Privacy</h2>
        <p className="text-sm leading-relaxed">
          Users must be at least 13 years old. We don’t knowingly collect data
          from children. If we discover this, we’ll delete it promptly.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">8. Policy Updates</h2>
        <p className="text-sm leading-relaxed">
          We may update this policy. Major changes will be announced or
          highlighted on this page.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold">9. Contact</h2>
        <p className="text-sm leading-relaxed">
          Questions? Reach us at{" "}
          <a
            href="mailto:support@langkahmu.app"
            className="text-[var(--primary)] underline"
          >
            support@langkahmu.app
          </a>
          .
        </p>
      </section>

      <Separator className="my-10" />

      <p className="text-xs text-zinc-500 text-center">
        Last updated: June 24, 2025
      </p>
    </div>
  );
}
