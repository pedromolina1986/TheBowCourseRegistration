import { GraduationCap } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-200 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-white w-6 h-6" />
            <span className="text-white text-lg font-semibold">Bow Valley College</span>
          </div>
          <p className="text-sm text-white">
            Empowering students with practical skills and knowledge for successful careers in software development.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Programs</h4>
          <ul className="space-y-2 text-sm text-white">
            <li><a href="#" className="hover:text-gray-900">Diploma Program</a></li>
            <li><a href="#" className="hover:text-gray-900">Post-Diploma</a></li>
            <li><a href="#" className="hover:text-gray-900">Certificate Program</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;