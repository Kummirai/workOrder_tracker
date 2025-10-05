import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#5e17eb] p-5 px-10">
      <nav className="flex flex-col md:flex-row items-center justify-between text-white">
        <h1 className="text-2xl font-bold font-serif mb-4 md:mb-0">
          Jobs
        </h1>
        <ul className="flex flex-col md:flex-row items-center">
          <Link
            href="/"
            className="mx-2 my-1 md:my-0 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer "
          >
            Home
          </Link>
          <Link
            href={"/work_orders"}
            className="mx-2 my-1 md:my-0 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer"
          >
            Work Orders
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;