import { Home, GamepadIcon, GraduationCap, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
      active: location.pathname === "/home"
    },
    {
      icon: GamepadIcon,
      label: "Games",
      href: "/games",
      active: location.pathname.startsWith("/games") || location.pathname === "/"
    },
    {
      icon: GraduationCap,
      label: "Courses",
      href: "/courses",
      active: location.pathname === "/courses"
    },
    {
      icon: UserCircle,
      label: "Profile",
      href: "/profile",
      active: location.pathname === "/profile"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-sm",
              item.active 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary transition-colors"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout; 