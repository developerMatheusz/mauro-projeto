import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];

export const dynamicParams = false;

export const generateStaticParams: StaticParams = () => {
  const categories = getTaxonomy(blog_folder, "categories");

  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(blog_folder);
  const filterByCategories = taxonomyFilter(posts, "categories", params.single);
  const sortedPosts = sortByDate(filterByCategories);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {sortedPosts.map((post: Post, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;
