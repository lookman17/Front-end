import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "./Logo";
const Footer = () => {
  return (
    <footer className="bg-[#016A70] text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      
        <section className="flex justify-center py-6">
            <div className="flex">
              <Logo />
              <div className="px-2 py-3">
                <p className="text-green-600 font-bold text-[15px] leading-tight">
                  Portal.Kegiatan
                </p>
                <p className="font-bold text-[11px] leading-2">TPQ.Darul.Ulum</p>
              </div>
            </div>
          </section>

        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center text-sm">
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul>
              <li><a href="/profil" className="hover:underline">About us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Support</h3>
            <ul>
              <li><a href="#" className="hover:underline">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact Us</h3>
            <p className="text-sm">📞 (62)086-7689-7000</p>
            <p className="text-sm">📧 <a href="mailto:DarulUlum@gmail.com" className="hover:underline">DarulUlum@gmail.com</a></p>
          </div>
        </div>

        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#016A70] p-2 rounded-full hover:bg-gray-200 transition">
            <FaFacebook className="h-5 w-5" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#016A70] p-2 rounded-full hover:bg-gray-200 transition">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#016A70] p-2 rounded-full hover:bg-gray-200 transition">
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Garis Pemisah */}
      <div className="border-t border-gray-300 mt-4"></div>

      {/* Copyright */}
      <div className="text-center text-sm mt-2">
        <p>&copy; {new Date().getFullYear()} Portal.Kegiatan. All rights reserved.</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;