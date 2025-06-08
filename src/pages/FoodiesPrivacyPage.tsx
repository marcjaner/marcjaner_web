export function FoodiesPrivacyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 py-8 text-gray-800 dark:text-gray-300">
      <h2 className="text-2xl font-bold mb-4">
        Privacy Policy Summary — Foodies
      </h2>

      <p className="mb-4">
        <strong>Foodies</strong> is a location-based social app for sharing and
        discovering restaurants. We only request the permissions strictly
        necessary to support core features:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Location</strong> (Precise, When-In-Use) – used to display
          nearby restaurants.
        </li>
        <li>
          <strong>Camera</strong> – used to let you take food photos.
        </li>
        <li>
          <strong>Photo Library</strong> – used to let you select and upload
          existing images.
        </li>
        <li>
          <strong>Microphone</strong> – used only when recording video.
        </li>
        <li>
          <strong>Local Storage</strong> – used to securely store your
          authentication token and preferences on your device.
        </li>
      </ul>

      <p className="mb-4">
        All data transfers are encrypted via <strong>HTTPS</strong>. Session
        tokens are stored securely using industry-standard mechanisms. Your
        posts and media are stored on our <strong>Supabase</strong> backend. We
        do <strong>not</strong> sell or share your personal data with third
        parties or advertisers.
      </p>

      <p className="mb-4">
        <strong>Analytics:</strong> We use <strong>PostHog</strong> to collect
        anonymous, aggregated app usage and performance data. No personally
        identifying data is collected or transmitted.
      </p>

      <p className="mb-4">
        <strong>Your account data belongs to you.</strong> You may delete your
        account at any time within the app, which will remove all associated
        data (posts, images, profile information) from our systems.
      </p>
    </div>
  );
}
