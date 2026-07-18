import {slugTransform} from "./";
export const injectHeadingIds = (htmlString) => {
  if (!htmlString) return '';

  // Parse the string into a temporary DOM document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Target all heading elements
  const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Track duplicate IDs exactly like extractHeadings
  const idCounts = {};

  headingElements.forEach((heading) => {
    const text = heading.textContent.trim();
    let baseId = slugTransform(text) || 'heading';
    let uniqueId = baseId;

    // 3. Handle duplicates sequentially
    if (idCounts[baseId]) {
      idCounts[baseId] += 1;
      uniqueId = `${baseId}-${idCounts[baseId]}`;
    } else {
      idCounts[baseId] = 1;
    }

    // 4. Set the id attribute directly onto the DOM node
    heading.setAttribute('id', uniqueId);
  });

  // 5. Return the full modified HTML string from the body
  return doc.body.innerHTML;

};