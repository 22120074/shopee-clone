function Footer() {
  const path = window.location.pathname;
  const isHomePage = path === '/';
  return (
    <div>
      {isHomePage && (
        <div className="h-[80px] bg-[#F5F5F5]"></div>
      )}

    <footer className="bg-gray-800 text-white py-4 h-[700px]">
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