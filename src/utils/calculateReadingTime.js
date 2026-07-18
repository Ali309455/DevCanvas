
// htmlToText.js
export const htmlToText = (html = "") => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

export const calculateReadingTime = (content = "") => {
  if (!content) return 0;

  const temp = document.createElement("div");
  temp.innerHTML = content;

  const text = temp.textContent || temp.innerText || "";

  const words = text.trim().split(/\s+/).filter(Boolean);

  const wordsPerMinute = 200;

  return Math.max(1, Math.ceil(words.length / wordsPerMinute));
};