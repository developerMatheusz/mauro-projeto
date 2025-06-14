import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { course_folder, pagination } = config.settings;

export const dynamicParams = false;

export const generateStaticParams = () => {
  const allPost: Post[] = getSinglePage(course_folder);
  const allSlug: string[] = allPost.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

const Courses = async (props: { params: Promise<{ page: number }> }) => {
  const params = await props.params;
  const postIndex: Post = getListPage(`${course_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(course_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div>
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-14 md:col-4">
                    <BlogCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={course_folder}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
