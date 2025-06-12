import React from "react";
import { getHomePageTitle } from "@/utils/brand";
import ImageComponent from "@/components/ImageComponent";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/activeblog`, {
      next: { revalidate: 60 }, // optional: enable ISR
    });

    const blogs = await res.json();

    return blogs.data.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { slug } = params;

  const res = await fetch(`${apiUrl}/blog/slug/${slug}`);

  if (!res.ok) {
    return {
      title: "Blog Not Found | " + getHomePageTitle(),
    };
  }

  const blog = await res.json();

  return {
    title: blog.data.metaTitle || `${blog.data.name} | ${getHomePageTitle()}`,
    description: blog.data.metaDescription || `Read blog: ${blog.data.name}`,
    keywords: Array.isArray(blog.data.metaKeywords)
      ? blog.data.metaKeywords.join(", ")
      : "",
  };
}

const BlogDetailsPage = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { slug } = params;

  const res = await fetch(`${apiUrl}/blog/slug/${slug}`);

  if (!res.ok) {
    return <div>Failed to load blog</div>;
  }

  const blog = await res.json();

  return (
    <div className="xl:container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{blog.data.name}</h1>
      <div className="flex items-center justify-center w-full mb-10 mt-10">
        <ImageComponent imageName={blog.data.thumbnailImage} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 mb-2">By {blog.data.author || "Unknown"}</p>
        <p className="text-gray-600 mb-2">
          {new Date(blog.data.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className={"grid grid-cols-12 gap-5"}>
        <div
          className="rendered-html col-span-10"
          dangerouslySetInnerHTML={{ __html: blog.data.longDesc }}
        />
        <div className="flex flex-col gap-2 mt-4 col-span-2">
          <h1>Tags:</h1>
          {blog.data.searchTags.map((tag, index) => (
            <span
              key={index}
              className="bg-orange-200 text-gray-800 px-3 py-1 rounded "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
