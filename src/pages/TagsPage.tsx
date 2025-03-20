import React from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, Tag as TagIcon } from "lucide-react";
import { useBlogTags, usePostsByTag } from "@/hooks/useBlogTags";

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return import.meta.env.DEV ? `http://localhost:8888${path}` : path;
};

const TagsPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const { data: tags, isLoading: tagsLoading } = useBlogTags();
  const { data: posts, isLoading: postsLoading } = usePostsByTag(tag);

  const isLoading = tagsLoading || postsLoading;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Tags Navigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags?.map((t) => (
                <Link
                  key={t}
                  to={`/blog/tags/${t.toLowerCase()}`}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    t.toLowerCase() === tag?.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <TagIcon size={14} />
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Posts for Selected Tag */}
          {tag && (
            <div>
              <h1 className="text-3xl font-bold mb-8">
                Posts tagged with "{tag}"
              </h1>
              {isLoading ? (
                <p className="text-muted-foreground">Loading posts...</p>
              ) : posts?.length === 0 ? (
                <p className="text-muted-foreground">
                  No posts found with this tag.
                </p>
              ) : (
                <div className="space-y-12">
                  {posts?.map((post) => (
                    <div
                      key={post.slug}
                      className="flex flex-col md:flex-row gap-8"
                    >
                      <div className="md:w-1/3">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                          <Link to={`/blog/${post.slug}`}>
                            <img
                              src={getImageUrl(post.featuredImage)}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags?.map((t, i) => (
                            <Link
                              key={i}
                              to={`/blog/tags/${t.toLowerCase()}`}
                              className="inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2 py-1 rounded hover:bg-secondary/80 hover:text-primary transition-colors"
                            >
                              <TagIcon size={12} /> {t}
                            </Link>
                          ))}
                        </div>
                        <h2 className="text-2xl font-bold mb-3">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          {post.readTime && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} /> {post.readTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TagsPage;
