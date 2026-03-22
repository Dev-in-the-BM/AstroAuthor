import { visit } from 'unist-util-visit';

/**
 * Adds support for image sizing and alignment using URL fragments.
 * - `!alt` for inline images.
 * - `!alt` for a 25x25px image.
 * - `!alt` for a 25x50px image.
 * - `!alt` for a 25x25px inline image.
 */
export function remarkSmartImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const [url, hash] = node.url.split('#');
      if (!hash) return;

      node.url = url; // Clean the URL from the hash
      const classes = ['my-0']; // Default: no vertical margin for all # images

      if (hash.includes('inline')) {
        classes.push('inline-block', 'align-middle');
      }

      // SAFE MERGE: Do not destroy existing node.data which MDX needs to compile!
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};

      const sizeMatch = hash.match(/(\d+)x?(\d+)?/);
      if (sizeMatch) {
        const width = sizeMatch[1];
        const height = sizeMatch[2] || width; // Use width for height if not specified
        node.data.hProperties.style = `width: ${width}px; height: ${height}px;`;
      }

      const existingClass = node.data.hProperties.class || '';
      node.data.hProperties.class = `${existingClass} ${classes.join(' ')}`.trim();
    });
  };
}

/**
 * Adds support for :::details[summary] and :::grid containers.
 */
export function remarkCustomDirectives() {
  return (tree) => {
    visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node) => {
      const data = node.data || (node.data = {});

      if (node.name === 'details') {
        data.hName = 'details';
        data.hProperties = data.hProperties || {};
        data.hProperties.class = 'p-4 my-4 bg-gray-50 dark:bg-slate-800 rounded-lg';

        // The directive's label `[My Summary]` becomes the content of the <summary> tag.
        // remark-directive places it inside a paragraph as the first child.
        const summaryParagraph = node.children[0];
        if (summaryParagraph && summaryParagraph.type === 'paragraph') {
          // Change the paragraph to a summary
          summaryParagraph.data = summaryParagraph.data || {};
          summaryParagraph.data.hName = 'summary';
          summaryParagraph.data.hProperties = { class: 'cursor-pointer font-bold' };
        }
      }

      if (node.name === 'grid') {
        data.hName = 'div';
        data.hProperties = data.hProperties || {};
        data.hProperties.class = 'not-prose grid grid-cols-2 md:grid-cols-3 gap-4 my-8';

        const newChildren = [];
        // Iterate through the paragraphs inside the :::grid block
        for (const child of node.children) {
          if (child.type === 'paragraph') {
            // Iterate through the items inside the paragraph (images, text nodes)
            for (const item of child.children) {
              // Skip empty text nodes (like newlines between images)
              if (item.type === 'text' && item.value.trim() === '') continue;
  
              // Find the actual image node, whether it's standalone or in a link
              const imageNode = item.type === 'image' ? item : (item.type === 'link' && item.children?.[0]?.type === 'image' ? item.children[0] : null);
  
              // If we found an image, style it to fill its container
              if (imageNode) {
                  imageNode.data = imageNode.data || {};
                  imageNode.data.hProperties = imageNode.data.hProperties || {};
                  const existingClasses = imageNode.data.hProperties.class || '';
                  imageNode.data.hProperties.class = `${existingClasses} w-full h-auto rounded-lg shadow-sm object-cover`.trim();
              }
              
              // **The Fix:** Wrap each item (image or link-with-image) in its own div to act as a grid cell.
              newChildren.push({
                type: 'paragraph', // Use a block-level type that remark understands
                data: { hName: 'div', hProperties: { class: 'flex w-full' } }, // Render this node as a <div>
                children: [item],
              });
            }
          } else {
            // Preserve non-paragraph children so we don't accidentally drop blocks
            newChildren.push(child);
          }
        }

        // Replace the grid's children with our new set of divs
        node.children = newChildren;
      }

      if (node.name === 'spoiler') {
        data.hName = node.type === 'textDirective' ? 'span' : 'div';
        data.hProperties = data.hProperties || {};
        data.hProperties.class = 'blur-sm hover:blur-none transition-all duration-300 cursor-pointer select-none bg-gray-200 dark:bg-gray-700 px-1 rounded';
      }
    });
  };
}