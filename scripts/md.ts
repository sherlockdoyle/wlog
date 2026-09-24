import type { Nodes } from 'mdast';

export function handleAlertNode(node: Nodes) {
  if (node.type === 'blockquote' && node.children[0].type === 'paragraph') {
    const textNode = node.children[0].children[0];
    if (textNode.type === 'text') {
      const match = textNode.value.match(/^\[!([A-Z]+)(!?)\]\s*/);
      if (match) {
        const alertType = match[1].toLowerCase();
        node.data ??= {};
        node.data.hProperties ??= {};
        node.data.hProperties['data-alert'] = alertType;
        if (!match[2]) node.data.hProperties['data-show-type'] = '';

        node.children.shift();
      }
    }
  }

  if ('children' in node) node.children.forEach(handleAlertNode);
}
