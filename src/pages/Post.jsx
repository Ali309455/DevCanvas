import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dbservice from "../appwrite/dbconfig";
import { Button, ReadingProgressBar, TableOfContents, PostCard } from "../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { useReadingTime, useScrollProgress, useScrollSpy } from "../hooks"; 
import extractHeadings from "../utils/extractHeadings";
import { injectHeadingIds } from "../utils";
import ReaderAISidebar from "../components/Sidebar/ReaderAISidebar";
import ArticleSkeleton from "../components/skeleton/ArticleSkeleton";
import ErrorState from "../components/feedback/ErrorState";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.authorId === userData.$id : false;
  const readingTime = useReadingTime(post && post.content);
  const articleRef = useRef(null);
  const progress = useScrollProgress(articleRef);
  const activeHeadingId = useScrollSpy(articleRef, post?.content);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);
      dbservice
        .getPost(slug)
        .then((data) => {
          if (data && data.rows && data.rows.length > 0) {
            const mainPost = data.rows[0];
            setPost(mainPost);

            // Fetch related posts filtering by category and omitting current slug
            console.log("Main Post Category: ", mainPost.category);
            dbservice
              .getRelatedPosts(mainPost.category, mainPost.slug)
              .then((relatedData) => {
                if (relatedData && relatedData.rows) {
                  console.log("Related Posts: ", relatedData.rows);
                  setRelatedPosts(relatedData.rows);
                }
              })
              .catch((err) => console.log("Related posts fetch error:", err));
          } else {
            setError("Article not found in database archives.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Get Post Error: ", error);
          setError("Failed to fetch article stream from databanks.");
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    dbservice
      .deletePost(post.$id)
      .then((status) => {
        status && dbservice.deleteFile(post.featuredImage);
        navigate("/all-posts");
      })
      .catch((error) => {
        console.log("Delete Post Error: ", error);
      });
  };

  // Memoizing headings to prevent continuous execution on every scroll update
  const { headings, processedHtml } = useMemo(() => {
    if (!post?.content) return { headings: [], processedHtml: "" };
    return {
      headings: extractHeadings(post.content),
      processedHtml: injectHeadingIds(post.content),
    };
  }, [post?.content]);

  const formattedDate = post && post.$createdAt 
    ? new Date(post.$createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Wednesday, July 23, 2025";

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <ErrorState
          title="Data Transfer Corrupted"
          description={error}
          onRetry={() => {
            setError(null);
            setLoading(true);
            dbservice
              .getPost(slug)
              .then((data) => {
                if (data && data.rows && data.rows.length > 0) {
                  const mainPost = data.rows[0];
                  setPost(mainPost);
                } else {
                  setError("Article not found.");
                }
                setLoading(false);
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
          }}
        />
      </div>
    );
  }

  return post ? (
    <div className="relative w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,16rem)] 2xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,18rem)] gap-6 xl:gap-8 items-start">
        {/* TOC — desktop sticky */}
        <aside className="hidden xl:block sticky top-8 self-start min-w-0 w-full">
          <TableOfContents
            headings={headings}
            activeHeadingId={activeHeadingId}
          />
        </aside>

        {/* Main content column */}
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8 md:gap-12 min-w-0">
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <img
                src={dbservice.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full aspect-[7/4] object-cover mb-8 md:mb-12 border-2 border-border rounded-[var(--radius-image)] shadow-brutal"
              />
              {isAuthor && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <div className="bg-surface/90 backdrop-blur-md border-2 border-border p-1.5 sm:p-2 rounded-[var(--radius-card)] shadow-brutal flex items-center gap-2 max-w-[calc(100vw-2rem)]">
                    <AnimatePresence mode="wait">
                      {!isConfirming ? (
                        <motion.div
                          key="actions"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.12 }}
                          className="flex items-center gap-2"
                        >
                          <Link to={`/edit-post/${post.slug || post.$id}`} className="no-underline">
                            <Button
                              variant="secondary"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => setIsConfirming(true)}
                          >
                            Delete
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="confirm"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.12 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-xs font-mono font-bold text-primary-text uppercase px-1">
                            Sure?
                          </span>
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() => setIsConfirming(false)}
                          >
                            No
                          </Button>
                          <Button
                            variant="danger"
                            size="small"
                            onClick={deletePost}
                          >
                            Yes
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between font-mono tracking-wide text-secondary-text">
                <span className="text-[14px]">{formattedDate}</span>
                <span className="text-[14px]">{readingTime} min read</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-primary-text font-heading leading-[1.20] uppercase break-words">
                {post.title}
              </h1>
            </div>
          </div>

          {/* TOC + AI — mobile / tablet (< xl) */}
          <div className="xl:hidden flex flex-col gap-3">
            {headings.length > 0 && (
              <details className="border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal group open:shadow-brutal-accent">
                <summary className="cursor-pointer list-none flex items-center justify-between min-h-11 px-4 py-3 font-heading font-bold text-sm uppercase tracking-widest text-primary-text [&::-webkit-details-marker]:hidden">
                  Contents
                  <span className="text-secondary-text group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-2 pb-3">
                  <TableOfContents
                    headings={headings}
                    activeHeadingId={activeHeadingId}
                    showTitle={false}
                    className="border-0 shadow-none p-2 rounded-none max-h-none"
                  />
                </div>
              </details>
            )}
            <details className="border-2 border-border bg-surface rounded-[var(--radius-card)] shadow-brutal group">
              <summary className="cursor-pointer list-none flex items-center justify-between min-h-11 px-4 py-3 font-heading font-bold text-sm uppercase tracking-widest text-primary-text [&::-webkit-details-marker]:hidden">
                AI Assistant
                <span className="text-secondary-text group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-2 pb-3">
                <ReaderAISidebar
                  post={post}
                  showTitle={false}
                  className="border-0 shadow-none p-2 rounded-none"
                />
              </div>
            </details>
          </div>

          {/* Content Area Rendering Engine */}
          <div
            ref={articleRef}
            className="browser-css text-[18px] leading-[1.38] text-primary-text flex flex-col gap-4 min-w-0
              [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold 
              [&_h4]:font-bold [&_h5]:font-bold [&_h6]:font-bold
              [&_h1]:scroll-mt-40 [&_h2]:scroll-mt-40 [&_h3]:scroll-mt-40 
              [&_h4]:scroll-mt-40 [&_h5]:scroll-mt-40 [&_h6]:scroll-mt-40"
          >
            {parse(processedHtml)}
          </div>

          <hr className="border-border border-t-2 mt-8" />

          {relatedPosts.length > 0 && (
            <div className="w-full min-w-0">
              <h3 className="text-xl font-bold uppercase tracking-wider font-heading mb-6 flex items-center gap-2 text-primary-text">
                <span className="w-2 h-2 bg-primary-accent inline-block"></span>
                Related Systems
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.$id} 
                    to={`/post/${relatedPost.slug}`}
                    className="border-2 border-border p-5 bg-surface rounded-[var(--radius-card)] block text-primary-text no-underline hover:shadow-brutal-accent hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 shadow-brutal min-w-0"
                  >
                    <span className="text-[10px] font-mono text-secondary-text uppercase tracking-widest block mb-2">
                      // {relatedPost.category}
                    </span>
                    <h4 className="font-bold font-heading text-md leading-tight hover:text-primary-accent transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reader AI — desktop sticky */}
        <aside className="hidden xl:block sticky top-8 self-start min-w-0 w-full">
          <ReaderAISidebar post={post} />
        </aside>
      </div>

      <ReadingProgressBar progress={progress} />
    </div>
  ) : null;
}

export default Post;