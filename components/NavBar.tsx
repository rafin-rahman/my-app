import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="font-bold">OFORM.IO</div>
      <div>
        <Link
          href="/login"
          className={
            'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
          }
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
