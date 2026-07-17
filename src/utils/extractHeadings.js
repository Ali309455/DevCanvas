import slugTransform from "./slugTransform";

export const extractHeadings = (htmlString) => {
  if (!htmlString) return [];

  // Parse the HTML string into a DOM document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Query all heading elements (h1 through h6)
  const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Track seen IDs to handle duplicates dynamically
  const idCounts = {};

  return Array.from(headingElements).map((heading) => {
    const text = heading.textContent.trim();
    const level = parseInt(heading.tagName.replace('H', ''), 10);
    
    // Generate base slug ID
    let baseId = slugTransform(text) || 'heading';
    let uniqueId = baseId;

    // Handle duplicates 
    if (idCounts[baseId]) {
      idCounts[baseId] += 1;
      uniqueId = `${baseId}-${idCounts[baseId]}`;
    } else {
      idCounts[baseId] = 1;
    }

    return {
      id: uniqueId,
      text,
      level,
    };
  });
};

export default extractHeadings;