import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image = "/og-image.png",
  url,
  type = "website",
}) => {
  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    if (import.meta.env.DEV) return `http://localhost:8888${path}`;
    return path;
  };

  const fullImageUrl = getImageUrl(image);
  const fullUrl = url || window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default MetaTags;
