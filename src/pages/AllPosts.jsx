import React, { useEffect, useState } from 'react';
import { PostCard } from '../components/index';
import { useSelector, useDispatch } from 'react-redux';
import dbservice from '../appwrite/dbconfig';
import { setPostsstore } from '../Store/postSlice';
import ArticleCardSkeleton from '../components/skeleton/ArticleCardSkeleton';
import EmptyState from '../components/feedback/EmptyState';
import ErrorState from '../components/feedback/ErrorState';

function AllPosts() {
  const dispatch = useDispatch();
  const storePosts = useSelector((state) => state.posts.posts);
  const [loading, setLoading] = useState(storePosts.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (storePosts.length === 0) {
      setLoading(true);
      dbservice
        .listPosts()
        .then((data) => {
          if (data) {
            dispatch(setPostsstore(data.rows));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Get All Posts Error: ", err);
          setError(err.message || "Failed to load posts");
          setLoading(false);
        });
    }
  }, [dispatch, storePosts.length]);

  if (loading) {
    return (
      <div className="w-full py-12 flex flex-col gap-6">
        <h1 className="text-4xl font-bold font-heading uppercase text-primary-text mb-4">All Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12">
          {Array.from({ length: 6 }).map((_, index) => (
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
          title="Failed to load database stream"
          description={error}
          onRetry={() => {
            setError(null);
            setLoading(true);
            dbservice
              .listPosts()
              .then((data) => {
                if (data) dispatch(setPostsstore(data.rows));
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

  if (storePosts.length === 0) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <EmptyState
          title="Terminal Feed is Empty"
          description="There are no published articles in the databanks yet."
          actionLabel="Go to Dashboard"
          actionHref="/dashboard"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full py-12 flex flex-col gap-6">
      <h1 className="text-4xl font-bold font-heading uppercase text-primary-text mb-4 border-b-2 border-border pb-4">
        All Stories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 xl:gap-12">
        {storePosts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default AllPosts;