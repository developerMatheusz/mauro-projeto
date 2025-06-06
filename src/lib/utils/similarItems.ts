import { Post } from "@/types";

const similarItems = (
  currentItem: Post,
  allItems: Post[],
  slug: string,
): Post[] => {
  let categories: string[] = [];
  let tags: string[] = [];

  if (currentItem.frontmatter.categories.length > 0) {
    categories = currentItem.frontmatter.categories;
  }

  if (currentItem.frontmatter.tags.length > 0) {
    tags = currentItem.frontmatter.tags;
  }

  const filterByCategories = allItems.filter((item: any) =>
    categories.find((category) =>
      item.frontmatter.categories.includes(category),
    ),
  );

  const filterByTags = allItems.filter((item: any) =>
    tags.find((tag) => item.frontmatter.tags.includes(tag)),
  );

  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  const filterBySlug = mergedItems.filter((product) => product.slug !== slug);

  return filterBySlug;
};

export default similarItems;
