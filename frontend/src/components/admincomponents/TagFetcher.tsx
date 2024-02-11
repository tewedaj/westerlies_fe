// TagFetcher.tsx

import React, { useState, useEffect } from "react";
import { Tag, getTag } from "../../pages/Admin/controller.admin"; // Import your API function for fetching tags

interface TagFetcherProps {
  render: (tags: Tag[]) => React.ReactNode;
}

const TagFetcher: React.FC<TagFetcherProps> = ({ render }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // Fetch tags from API and update state
    async function fetchTags() {
      try {
        const response: any = await getTag();
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }
    fetchTags();
  }, []);

  return <>{render(tags)}</>;
};

export default TagFetcher;
