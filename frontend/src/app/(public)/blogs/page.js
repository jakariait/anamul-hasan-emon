import ImageComponent from "@/components/ImageComponent";
import Link from "next/link";
import { getHomePageTitle } from "@/utils/brand";



export function generateMetadata({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || '1');
  const baseTitle = getHomePageTitle();

  return {
    title: `Blogs - Page ${currentPage} | ${baseTitle}`,
    description: `Read our latest blogs. Page ${currentPage} from ${baseTitle} packed with valuable insights and updates.`,
    keywords: ["blogs", "latest blogs", "active blogs", baseTitle],
  };
}



export default async function BlogsPage({ searchParams }) {
  // Get page from query params, default to 1
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const currentPage = parseInt(searchParams?.page) || 1;
  const limit = 20; // blogs per page

  try {
    // Fetch with page and limit params if your API supports it
    const res = await fetch(
      `${apiUrl}/activeblog?page=${currentPage}&limit=${limit}`,
      {
        cache: "no-store", // ensure fresh data on each request
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }


    const data = await res.json();
    const blogs = data.data || [];
    const totalPages = data.totalPages || 1;

    if (blogs.length === 0) {
      return (
        <div className="max-w-4xl mx-auto p-4 text-center">
          <p className="text-gray-600 text-lg">No blogs found.</p>
        </div>
      );
    }

    return (
      <div className="xl:container xl:mx-auto   p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Stay Informed — Read Our Blogs</h1>

        <div className="grid grid-cols-3  gap-6 mb-6">
          {blogs.map((blog) => (
            <div key={blog._id} className=" flex flex-col gap-4">
              <div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="hover:underline text-orange-500"
                >
                  <ImageComponent
                    imageName={blog.thumbnailImage}
                    className="rounded w-full aspect-video object-contain"
                  />
                </Link>
              </div>
              <Link
                href={`/blogs/${blog.slug}`}
                className="hover:underline text-orange-500"
              >
                {blog.name}
              </Link>{" "}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <nav className="flex justify-center items-center space-x-4 mt-10">
          <PaginationButton
            disabled={currentPage <= 1}
            href={`/blogs?page=${currentPage - 1}`}
            label="Previous"
          />
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <PaginationButton
            disabled={currentPage >= totalPages}
            href={`/blogs?page=${currentPage + 1}`}
            label="Next"
          />
        </nav>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-600 font-semibold">Error: {error.message}</p>
      </div>
    );
  }
}

// Pagination Button Component
function PaginationButton({ disabled, href, label }) {
  // You can use Next.js Link or <a> depending on your routing preferences
  // Here using <a> for simplicity (replace with Link if you want client side routing)
  return (
    <a
      href={disabled ? undefined : href}
      className={`px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      {label}
    </a>
  );
}