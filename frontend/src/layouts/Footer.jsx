function Footer() {
  // const path = window.location.pathname;
  // const isHomePage = path === '/';
  return (
    <div className="">
      <div className="pt-6 bg-backgroundGrayColor"></div>

      <footer className="bg-gray-800 text-white py-4 h-[200px]">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
