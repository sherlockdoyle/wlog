import type { RehypePlugin } from '@astrojs/markdown-remark';
import type { Nodes } from 'mdast';
import rehypeKatex from 'rehype-katex';

export function replaceMathNodeDev(node: Nodes) {
  if (node.type === 'math') {
    node.data ??= {};
    node.data.hName = 'div';
    node.data.hProperties = { className: ['math-display'] };
  } else if (node.type === 'inlineMath') {
    node.data ??= {};
    node.data.hName = 'span';
    node.data.hProperties = { className: ['math-inline'] };
  }

  if ('children' in node) node.children.forEach(replaceMathNodeDev);
}

export const customKatexMacroPlugin: RehypePlugin = () => (tree, file) => {
  const macros = file.data.astro?.frontmatter?.katexMacros;
  return rehypeKatex({ macros })(tree, file);
};
