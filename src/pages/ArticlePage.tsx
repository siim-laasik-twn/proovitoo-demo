import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No article ID provided.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://proovitoo.twn.ee/api/list/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result: Article = await response.json();
        setArticle(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="loading-message">Loading article...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!article) return <div className="not-found-message">Article not found.</div>;

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <div className="article-content-intro" dangerouslySetInnerHTML={{ __html: article.intro }} />
      {article.image && (
        <img src={article.image.large} alt={article.image.alt} className="article-intro-image" />
      )}
      {article.images && article.images.length > 0 && (
        <div className="image-gallery">
          {selectedImage && (
            <div className="large-image-overlay" onClick={() => setSelectedImage(null)}>
              <img src={selectedImage} alt="Large" className="large-image" />
            </div>
          )}
          <div className="thumbnails">
            {article.images.map((img: { small: string; large: string }, idx: number) => (
              <img
                key={idx}
                src={img.small}
                alt={`Thumbnail ${idx}`}
                className="thumbnail"
                onClick={() => setSelectedImage(img.large)}
                style={{ cursor: 'pointer', margin: 4, width: 80 }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.body }} />
      {article.tags && (
        <div className="tags">
          {(Array.isArray(article.tags)
            ? (article.tags.length === 1 && typeof article.tags[0] === 'string'
                ? article.tags[0].split(',').map(tag => tag.trim())
                : article.tags)
            : []
          ).map((tag: string, idx: number) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlePage;