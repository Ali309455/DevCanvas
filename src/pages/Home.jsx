import React, { useEffect, useState } from "react";
import dbservice from "../appwrite/dbconfig";
import { PostCard } from "../components";
import { useDispatch } from "react-redux";
import { setPostsstore } from "../Store/postSlice";
import { Link } from "react-router-dom";
import HeroSkeleton from "../components/skeleton/HeroSkeleton";
import ArticleCardSkeleton from "../components/skeleton/ArticleCardSkeleton";
import ErrorState from "../components/feedback/ErrorState";

const CATEGORIES = ["All", "Web", "App", "AI", "Data", "Coding", "Design", "Other"];

function Home() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  
  useEffect(() => {
    setLoading(true);
    dbservice
      .listPosts()
      .then((data) => {
        if (data) {
          setPosts(data.rows);
          dispatch(setPostsstore(data.rows));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Get All Posts Error: ", error);
        setError("Failed to fetch database stream. Please verify connection.");
        setLoading(false);
      });
  }, [dispatch]);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const heroPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <div className="w-full pb-24">
        <HeroSkeleton />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <ErrorState
          title="Terminal Connection Offline"
          description={error}
          onRetry={() => {
            setError(null);
            setLoading(true);
            dbservice
              .listPosts()
              .then((data) => {
                if (data) {
                  setPosts(data.rows);
                  dispatch(setPostsstore(data.rows));
                }
                setLoading(false);
              })
              .catch((err) => {
                setError("Retry failed: " + err.message);
                setLoading(false);
              });
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full pb-24 overflow-x-clip">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-24 border-b-2 border-border flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-6 w-full">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-heading text-primary-text leading-[0.95] tracking-tighter uppercase drop-shadow-[4px_4px_0px_var(--color-primary-accent)]">
            Tech <br/> Meets <br/> Simplicity
          </h1>
          <p className="text-lg sm:text-xl text-secondary-text font-mono max-w-lg mt-4 border-l-4 border-primary-accent pl-4">
            Decode the noise. We bring you bleeding-edge engineering, AI paradigms, and unfiltered design logic.
          </p>
          <div className="flex gap-4 sm:gap-10 mt-8 flex-wrap">
            <a href="#feed" className="px-8 py-4 bg-border text-background dark:bg-border dark:text-background font-bold uppercase tracking-widest hover:bg-primary-accent hover:text-white hover:-translate-y-1 hover:shadow-brutal-accent transition-all duration-200 rounded-[var(--radius-button)] shadow-brutal">
              Start Reading
            </a>
            <Link to="/become-author" className="px-8 py-4 border-2 border-border text-primary-text font-bold uppercase tracking-widest hover:bg-border hover:text-background transition-all duration-200 rounded-[var(--radius-button)] shadow-brutal bg-surface">
              Write for Us
            </Link>
          </div>

          {/* Compact featured card — mobile only */}
          {heroPost && (
            <Link
              to={`/post/${heroPost.slug}`}
              className="md:hidden mt-4 block border-2 border-border bg-surface p-4 rounded-[var(--radius-card)] shadow-brutal focus-visible:outline-none"
            >
              <img
                src={dbservice.getFilePreview(heroPost.featuredImage)}
                alt={heroPost.title}
                className="w-full aspect-video object-cover border-2 border-border rounded-[var(--radius-image)]"
              />
              <span className="mt-4 block text-xs font-mono text-primary-accent uppercase tracking-widest">
                // Featured: {heroPost.category}
              </span>
              <h2 className="mt-1 text-xl font-bold font-heading text-primary-text leading-tight line-clamp-2">
                {heroPost.title}
              </h2>
            </Link>
          )}
        </div>
        
        {heroPost && (
          <div className="flex-1 w-full relative group hidden md:block">
             <Link to={`/post/${heroPost.slug}`} className="block focus-visible:outline-none">
               <div className="absolute inset-0 bg-primary-accent translate-x-3 translate-y-3 border-2 border-border -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300 rounded-[var(--radius-card)]"></div>
               <div className="border-2 border-border bg-surface p-6 md:p-10 lg:p-20 rounded-[var(--radius-card)] shadow-brutal transition-all duration-300">
                 <img 
                   src={dbservice.getFilePreview(heroPost.featuredImage)} 
                   alt={heroPost.title}
                   className="w-[95%] aspect-video object-cover border-2 border-border rounded-[var(--radius-image)] filter grayscale dark:grayscale-[50%] group-hover:grayscale-0 transition-all duration-500" 
                 />
                 <div className="mt-6 flex flex-col gap-2">
                   <span className="text-xs font-mono text-primary-accent uppercase tracking-widest">
                     // Featured: {heroPost.category}
                   </span>
                   <h2 className="text-3xl font-bold font-heading text-primary-text leading-tight group-hover:text-primary-accent transition-colors line-clamp-2">
                     {heroPost.title}
                   </h2>
                   <p className="text-sm font-mono text-secondary-text mt-2">
                     {new Date(heroPost.$createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                   </p>
                 </div>
               </div>
             </Link>
          </div>
        )}
      </section>

      {/* Categories & Feed */}
      <section id="feed" className="pt-16 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-2 border-border pb-5 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-primary-text uppercase tracking-tight flex items-center gap-3 shrink-0">
            <span className="w-4 h-4 bg-primary-accent inline-block"></span>
            Terminal Feed
          </h2>
          
          <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-1 scrollbar-thin flex-nowrap md:flex-wrap">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 min-h-11 text-sm font-mono uppercase tracking-widest border-2 transition-all cursor-pointer rounded-full shrink-0 ${
                  activeCategory === cat 
                  ? "border-border bg-border text-background" 
                  : "border-transparent text-secondary-text hover:border-border hover:text-primary-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 mt-10">
            {gridPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center border-2 border-dashed border-border rounded-[var(--radius-card)] bg-surface shadow-brutal">
            <p className="text-xl font-mono text-secondary-text uppercase tracking-widest">
              [ 404: No data streams found in this sector ]
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
