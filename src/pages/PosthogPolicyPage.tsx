import React from "react";

export default function PosthogPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-inter">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Last updated: May 1, 2025
      </p>

      <p className="mb-4">
        <strong>PostHog Self-Blocker</strong> ("we", "our", or "the Extension")
        is committed to protecting your privacy. This Privacy Policy explains
        how we handle information in connection with our Chrome extension, which
        allows you to block PostHog analytics on domains you choose.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Blocked Domains List</strong>: We store only the list of
          domains you choose to block in your browser's{" "}
          <code>chrome.storage.sync</code>. This data is never transmitted to
          any external server.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        2. Use of Information
      </h2>
      <p className="mb-4">
        The list of blocked domains is used strictly to determine when to stub
        out the PostHog API. No other use is made of this data.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        3. Data Storage & Security
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          All data is stored locally in your browser's synchronized storage. We
          do not collect, transmit, or store your data on any external server.
        </li>
        <li>
          You can remove or modify your blocked-domains list at any time via the
          Extension's Options page.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        4. Third-Party Services
      </h2>
      <p className="mb-4">
        The Extension does not integrate any third-party analytics, advertising,
        or tracking services.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        5. Children's Privacy
      </h2>
      <p className="mb-4">
        Our Extension is not targeted at children under 13. We do not knowingly
        collect information from anyone under 13.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        6. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will
        appear here with a revised "Last updated" date.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        7. Contact Us
      </h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:privacy@marcjaner.com"
          className="text-orange-500 hover:underline"
        >
          privacy@marcjaner.com
        </a>
        .
      </p>

      <footer className="mt-12 text-xs text-gray-500 dark:text-gray-400">
        &copy; 2025 Marc Janer. All rights reserved.
      </footer>
    </div>
  );
}
