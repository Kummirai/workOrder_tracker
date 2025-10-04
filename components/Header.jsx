const Header = () => {
  return (
    <header className="bg-blue-700 p-5 px-10">
      <nav className="grid grid-cols-5">
        <h1 className="text-2xl font-bold font-serif col-start-1 col-end-2">
          Jobs
        </h1>
        <ul className="col-start-2 col-end-3 flex items-center justify-center">
          <li className="px-2">Home</li>
          <li className="px-2">Add Invoice</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
