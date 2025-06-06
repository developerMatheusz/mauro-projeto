import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { plainify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";

const CourseCard = ({ data }: { data: Post }) => {
  const { summary_length, course_folder } = config.settings;
  const { title, image } = data.frontmatter;
  return (
    <div className="bg-body dark:bg-darkmode-body">
      {image && (
        <ImageFallback
          className="mb-6 w-full max-h-[400px] object-cover rounded"
          src={image}
          alt={title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/${course_folder}/${data.slug}`} className="text-[#035373]">{title}</Link>
      </h4>
      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
      <Link
        className="btn border border-[#035373] hover:bg-[#035373] hover:text-[white] text-[#035373] btn-sm"
        href={`/${course_folder}/${data.slug}`}
      >
        Acessar Curso Grátis
      </Link>
    </div>
  );
};

export default CourseCard;
