export const mapUserToTreeData = (user) => {
  return { key: user.id, title: user.name, children: [] };
};
