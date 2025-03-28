import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Programs",
      links: [
        { name: "Business English", href: "#" },
        { name: "Interview Preparation", href: "#" },
        { name: "Presentation Skills", href: "#" },
        { name: "Technical English", href: "#" },
        { name: "Email & Written Communication", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Free Guides", href: "#" },
        { name: "Vocabulary Tools", href: "#" },
        { name: "Grammar Checker", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <a href="/" className="inline-block">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
                  Lingstitude
                </span>
              </a>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Specialized English training for career advancement, helping
              professionals excel in the global workplace.
            </p>
            <div className="flex space-x-4">
              {[
                { label: "Twitter", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "YouTube", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <div className="h-5 w-5"></div>
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.name == "About Us" ? (
                      <a
                        href={"/about"}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <span className="text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Lingstitude. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
