import { Tree } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import { mapPostToTreeData, mapUserToTreeData } from "../../../../entities";
import { getPosts } from "../../../../shared";
import { useMainPageStore } from "../../model";

const MainTree = () => {
  const users = useMainPageStore((state) => state.users);
  const loadUsers = useMainPageStore((state) => state.getUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (users.status === "pending") {
    return <>Loading...</>;
  }

  if (users.status === "success") {
    return <MainTreeSuccess users={users.payload} />;
  }

  return <>Error occured</>;
};

const MainTreeSuccess = ({ users }) => {
  const [treeData, setTreeData] = useState(
    useMemo(() => users.map(mapUserToTreeData), [users])
  );

  const onLoadData = useCallback(async ({ key, children }) => {
    const posts = await getPosts({
      where: {
        userId: key,
      },
    });

    setTreeData((treeData) => {
      return treeData.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            children: posts.map((post) =>
              mapPostToTreeData(post, (postTreeItem) => ({
                ...postTreeItem,
                key: `${key}-${postTreeItem.key}`,
                isLeaf: true,
              }))
            ),
          };
        }

        return item;
      });
    });
  }, []);

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

export { MainTree };
