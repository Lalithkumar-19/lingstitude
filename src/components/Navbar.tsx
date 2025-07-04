import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOutIcon, Menu, User2Icon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Disable scroll when mobile menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto"; // Reset scroll on unmount
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("Usertoken");
    localStorage.removeItem("User");
    localStorage.removeItem("Admintoken");
    window.location.href = "/";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-4",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          href="/"
          className="flex items-center space-x-2 relative z-10"
          aria-label="Lingstitute Logo"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
            Lingstitute
          </span>
        </a>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </a>
            {user && user.isStudent && (
              <a
                href="batches"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Batches
              </a>
            )}
            <a
              href="about"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              About Us
            </a>
            <a
              href="/#testimonials"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Testimonials
            </a>

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="p-2 rounded-sm text-foreground/80 hover:text-foreground transition-colors bg-blue-600 text-white hover:text-white"
                >
                  Admin panel
                </Link>
                <LogOutIcon className="cursor-pointer" onClick={handleLogout} />
              </>
            )}
            {!isAdmin &&
              (user?.fullName ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User2Icon className="text-blue-500 line-clamp-1" />
                    {user.fullName}
                  </Link>
                  <LogOutIcon
                    className="cursor-pointer"
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white px-8 py-24 flex flex-col origin-top transition-all duration-300 ease-in-out md:hidden ${
            isOpen
              ? "opacity-100 translate-y-0 h-screen"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <nav className="flex flex-col space-y-8 text-lg font-medium">
            <a
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            {user && user.isStudent && (
              <a
                href="batches"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Batches
              </a>
            )}
            <a
              href="about"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </a>
            <a
              href="/#testimonials"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="p-2 rounded-sm text-foreground/80 hover:text-foreground transition-colors bg-blue-600 text-white hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Admin panel
                </Link>
                <LogOutIcon
                  className="cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
            {!isAdmin &&
              (user?.fullName ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <User2Icon className="text-blue-500 line-clamp-1" />
                    {user.fullName}
                  </Link>
                  <LogOutIcon
                    className="cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  />
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button>Login</Button>
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
