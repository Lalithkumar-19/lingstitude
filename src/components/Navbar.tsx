
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-4",
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center space-x-2 relative z-10"
          aria-label="Lingstitude Logo"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
            Lingstitude
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </a>
            <a href="live-classes" className="text-foreground/80 hover:text-foreground transition-colors">
              Live Classes
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About Us
            </a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
              Testimonials
            </a>
            {/* <a href="signup" className="text-foreground/80 hover:text-foreground transition-colors">
              Sign Up
            </a> */}
          </nav>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
           
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-white px-8 py-24 flex flex-col origin-top transition-all duration-300 ease-in-out md:hidden ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <nav className="flex flex-col space-y-8 text-lg font-medium">
            <a 
              href="#" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="live-classes" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Live Classes
            </a>
            <a 
              href="#about" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
             
             
            
            </nav>
            <Link to="/signup">
            <Button className="w-full mt-6">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
