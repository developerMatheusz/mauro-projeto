import CourseCard from "@/components/CourseCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
const { course_folder, pagination } = config.settings;

const Courses = () => {
  const courseIndex: Post = getListPage(`${course_folder}/_index.md`);
  const { title, meta_title, description, image } = courseIndex.frontmatter;
  const posts: Post[] = getSinglePage(course_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={courseIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div>
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-14 md:col-4">
                    <CourseCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={course_folder}
                currentPage={1}
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
