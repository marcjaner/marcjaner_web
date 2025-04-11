import React from "react";
import { Helmet } from "react-helmet-async";

interface BlogMetaTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const BlogMetaTags: React.FC<BlogMetaTagsProps> = ({
  title,
  description,
  image,
  url,
}) => {
  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    if (import.meta.env.DEV) return `http://localhost:8888${path}`;
    return path;
  };

  const fullImageUrl = getImageUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default BlogMetaTags;
