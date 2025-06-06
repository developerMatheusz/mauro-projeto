import CourseActions from "@/components/CourseActions";
import CourseCard from "@/components/CourseCard";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import { parseQuestions } from "@/lib/utils/parseQuestions";
import similarItems from "@/lib/utils/similarItems";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { course_folder } = config.settings;

export const dynamicParams = false;

export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(course_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const CourseSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(course_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
  } = frontmatter;
  const similarCourses = similarItems(post, posts, post.slug!)?.slice(0, 3);
  const contentSplit1 = content && content.split("## 📚 Conteúdo das Aulas")[0] || content || "";
  const contentSplit2 =
    content &&
    content
      .split("## 📚 Conteúdo das Aulas")[1]
      ?.split("## 📝 Prova Final")[0]
      ?.trim() || "";
  const contentSplit2Html = markdownify(contentSplit2, true).__html;

  const finalTest =
    content &&
    content.split("## 📝 Prova Final")[1]?.trim() || "";

  const finalTestWithoutAnswer = finalTest

  const parsedQuestions = parseQuestions(finalTestWithoutAnswer);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {image && (
                <div className="mb-10">
                  <ImageFallback
                    src={image}
                    height={500}
                    width={1200}
                    alt={title}
                    className="w-full rounded max-h-[1080px] object-cover"
                  />
                </div>
              )}
              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-4 text-[#035373]"
              />
              <div className="content mb-10">
                <MDXContent content={contentSplit1} />
              </div>
            </article>
          </div>
          <CourseActions courseContent1={contentSplit2Html} courseContent2={parsedQuestions} />

          {similarCourses.length > 0 && (
            <div className="section pb-0">
              <h2 className="h3 mb-12 text-center text-[#035373]">Cursos Relacionados</h2>
              <div className="row justify-center">
                {similarCourses.map((post) => (
                  <div key={post.slug} className="lg:col-4 md:col-6 mb-14">
                    <CourseCard data={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CourseSingle;
