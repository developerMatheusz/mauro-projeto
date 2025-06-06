import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="mb-28">
          <div className="container">
            <div className="rounded-xl px-4 py-16 dark:bg-darkmode-light xl:p-20 bg-[#F2A950]">
              <div className="row items-center justify-between">
                <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="w-full"
                    src={data.frontmatter.image}
                    width={392}
                    height={390}
                    alt="cta-image"
                  />
                </div>
                <div className="md:col-7 md:order-1">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2 text-[#035373]"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6 text-[#035373]"
                  />
                  {data.frontmatter.button.enable && (
                    <Link
                      className="btn bg-[#035373] text-white"
                      href={data.frontmatter.button.link}
                    >
                      {data.frontmatter.button.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
