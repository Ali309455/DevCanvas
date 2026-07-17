import React, { useState, useEffect, useCallback } from "react";
import { Container, PostForm } from "../components/index";
import { useParams, useNavigate } from "react-router-dom";
import dbservice from "../appwrite/dbconfig";
import ErrorState from "../components/feedback/ErrorState";

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadPost = useCallback(async () => {
    if (!slug) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bySlug = await dbservice.getPost(slug);
      if (bySlug?.rows?.length > 0) {
        setPost(bySlug.rows[0]);
        return;
      }

      // Fallback: route param may be document $id
      const byId = await dbservice.getPostById(slug);
      if (byId) {
        setPost(byId);
      } else {
        setPost(null);
        setError("Post not found in database archives.");
      }
    } catch (err) {
      console.error("Get Post Error: ", err);
      setPost(null);
      setError("Failed to load post for editing.");
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center py-12">
        <p className="font-mono text-secondary-text animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <ErrorState
          title="Edit Stream Offline"
          description={error || "Post not found."}
          onRetry={loadPost}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
