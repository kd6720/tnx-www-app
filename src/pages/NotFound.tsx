import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

const NotFound = () => (
  <div className="bg-navy-50 min-h-[70vh] flex items-center justify-center">
    <Seo
      title="Page Not Found | TrustedNetworx"
      description="The page you're looking for doesn't exist or may have moved."
      noindex
    />
    <div className="text-center px-4">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-navy-900">Page not found</h1>
      <p className="mt-4 max-w-md text-navy-500">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/" className="btn-primary">
          Back to Home
          <ArrowRight size={18} />
        </Link>
        <Link to="/contact" className="btn-ghost">
          Contact Us
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
