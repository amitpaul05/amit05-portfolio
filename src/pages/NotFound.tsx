import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground px-margin-mobile">
      <div className="text-center">
        <p className="font-sans text-label-md uppercase tracking-widest text-secondary mb-4">
          Error 404
        </p>
        <h1 className="font-sans text-[80px] leading-none font-bold text-primary mb-4">404</h1>
        <p className="font-serif text-body-lg text-on-surface-variant mb-8">
          This page wandered off the manuscript.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-sans text-label-md hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
