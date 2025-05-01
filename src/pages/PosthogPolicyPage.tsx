import React from "react";

export default function PosthogPolicyPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: May 1, 2025</p>
            <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">PostHog Self-Blocker</strong>{" "}
              ("we", "our", or "the Extension") is committed to protecting your
              privacy. This Privacy Policy explains how we handle information in
              connection with our Chrome extension, which allows you to block
              PostHog analytics on domains you choose.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside mb-4 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Blocked Domains List
                </strong>
                : We store only the list of domains you choose to block in your
                browser's{" "}
                <code className="bg-secondary/50 px-1.5 py-0.5 rounded text-sm font-mono">
                  chrome.storage.sync
                </code>
                . This data is never transmitted to any external server.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              2. Use of Information
            </h2>
            <p className="text-muted-foreground mb-4">
              The list of blocked domains is used strictly to determine when to
              stub out the PostHog API. No other use is made of this data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              3. Data Storage & Security
            </h2>
            <ul className="list-disc list-inside mb-4 text-muted-foreground">
              <li>
                All data is stored locally in your browser's synchronized
                storage. We do not collect, transmit, or store your data on any
                external server.
              </li>
              <li>
                You can remove or modify your blocked-domains list at any time
                via the Extension's Options page.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-4">
              The Extension does not integrate any third-party analytics,
              advertising, or tracking services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              5. Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              Our Extension is not targeted at children under 13. We do not
              knowingly collect information from anyone under 13.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. Any changes
              will appear here with a revised "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a
                href="mailto:privacy@marcjaner.com"
                className="text-primary hover:underline"
              >
                privacy@marcjaner.com
              </a>
              .
            </p>

            <footer className="mt-12 text-xs text-muted-foreground">
              &copy; 2025 Marc Janer. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
