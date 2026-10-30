import { useEffect } from "react";

/**
 * A custom hook to dynamically update document title and meta description for SEO.
 * @param {string} title - The specific page title.
 * @param {string} description - The specific page description.
 */
const useSEO = (title, description) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} ┃ Professional Edge Global`;
    }
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description]);
};

export default useSEO;
