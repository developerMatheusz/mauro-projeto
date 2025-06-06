import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";

const PostSidebar = ({
  tags,
  categories,
  allCategories,
}: {
  tags: string[];
  categories: string[];
  allCategories: string[];
}) => {
  return (
    <div className="lg:col-4">
      <div className="mb-8">
        <h5 className="mb-6 text-[#035373]">Categorias</h5>
        <div className="rounded bg-light p-8 dark:bg-darkmode-light">
          <ul className="space-y-4">
            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              return (
                <li key={category}>
                  <Link
                    className="flex justify-between hover:text-[#035373] dark:hover:text-darkmode-primary"
                    href={`/categories/${category}`}
                  >
                    {humanize(category)} <span>({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mb-8">
        <h5 className="mb-6 text-[#035373]">Tags</h5>
        <div className="rounded bg-light p-6 dark:bg-darkmode-light">
          <ul>
            {tags.map((tag: string) => {
              return (
                <li className="inline-block" key={tag}>
                  <Link
                    className="m-1 block rounded bg-white px-3 py-1 hover:bg-[#035373] hover:text-white"
                    href={`/tags/${tag}`}
                  >
                    {humanize(tag)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
