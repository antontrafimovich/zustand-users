export const mapPostToTreeData = (post, map) => {
  const defaultValue = { key: post.id, title: post.title, children: [] };

  if (map) {
    return map(defaultValue);
  }

  return defaultValue;
};
