import React from 'react';
import EditBlog from "@/components/EditBlog";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/blog`);
    const json = await res.json();

    // Map over blogs to return { id } params expected by the route
    return json.data.map((blog) => ({
      id: blog._id,  // Must match [id] param in the filename exactly
    }));
  } catch (error) {
    console.error("Error fetching blog ids for admin dashboard:", error);
    return [];
  }
}


const Page = () => {
  return (
    <div>
			<EditBlog />
    </div>
  );
};

export default Page;