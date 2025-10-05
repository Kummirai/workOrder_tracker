import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#5e17eb] p-5 px-10">
      <nav className="grid grid-cols-5 text-white">
        <h1 className="text-2xl font-bold font-serif col-start-1 col-end-2">
          Jobs
        </h1>
        <ul className="col-start-2 col-end-3 flex items-center justify-center">
          <Link
            href="/"
            className="mx-2 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer "
          >
            Home
          </Link>
          <Link
            href={"/boq_items"}
            className="mx-2 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer"
          >
            BOQ Items
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
