function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 mt-8 border-t">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p>
          © {year} Task Manager. All rights reserved.
        </p>
        <ul className="flex gap-4 mt-2 sm:mt-0">
          <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-600">Terms</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
