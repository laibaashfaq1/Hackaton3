import Image from "next/image";
import { IoMdSearch } from "react-icons/io";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "Going all-in with minimalist design",
      description: "Learn how to embrace minimalism in your designs.",
      image: "/Laptop.png",
      date: "Dec 5, 2024",
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      description: "Innovative tips to transform your space.",
      image: "/hand.png",
      date: "Dec 3, 2024",
    },
    {
      id: 3,
      title: "Handmade pieces that look time-tested",
      description: "How to create timeless handmade pieces.",
      image: "/hands.png",
      date: "Nov 29, 2024",
    },
  ];

  const categories = ["Crafts", "Design", "Handmade", "Interior", "Wood"];
  const recentPosts = [
    { id: 1, image: "/des.png", title: "Going all in with millennial design", date: "Aug 3, 2022" },
    { id: 2, image: "/decor.png", title: "Exploring new ways of decorating", date: "Aug 3, 2022" },
    { id: 3, image: "/handmade.png", title: "Handmade pieces that took time to make", date: "Aug 3, 2022" },
    { id: 4, image: "/milan.png", title: "Modern home in Milan", date: "Aug 3, 2022" },
    { id: 5, image: "/rede.png", title: "Colorful office redesign", date: "Aug 3, 2022" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url('/blog.png')` }}
      />

      {/* Main Content */}
      <main className="container mx-auto p-6 lg:flex lg:space-x-8">
        {/* Blog Posts Section */}
        <section className="lg:w-2/3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded shadow p-4 mb-6 hover:shadow-lg transition"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full rounded"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.description}</p>
                <p className="text-gray-400 text-sm mt-1">{blog.date}</p>
              </div>
            </div>
          ))}

          {/* Pagination Number */}
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-pink-100 rounded hover:bg-yellow-600 hover:text-white">1</button>
            <button className="px-4 py-2 bg-pink-100 rounded hover:bg-yellow-600 hover:text-white mx-2">
              2
            </button>
            <button className="px-4 py-2 bg-pink-100 rounded hover:bg-yellow-600 hover:text-white">3</button>
          </div>
        </section>

        {/* Sidebar */}
        <div className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded shadow p-4 flex items-center">
            <input
              type="text"
              placeholder="Search your needs"
              className="w-full text-gray-600 placeholder-gray-400 outline-none"
            />
            <IoMdSearch className="text-gray-700 ml-2 text-xl cursor-pointer" />
          </div>

          {/* Categories */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-10">Categories</h3>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="text-gray-400 hover:text-black mt-2 mb-6 flex justify-between items-center"
                >
                  <span>{category}</span>
                  <span className=" text-gray-400 ">2</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-10">Recent Posts</h3>
            <ul>
              {recentPosts.map((post) => (
                <li key={post.id} className="flex items-center mt-4 mb-10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="text-gray-800 hover:text-yellow-600 text-sm font-medium">
                      {post.title}
                    </p>
                    <p className="text-gray-400 text-xs">{post.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
