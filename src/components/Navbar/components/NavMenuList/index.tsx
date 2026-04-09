import NavMenu from "./NavMenu";
import SignOutButton from "./SignOutButton";
import type { NavItem } from "./getNavItems";

const NavMenuList = async ({
  navList,
  isAuthenticated,
}: {
  navList: NavItem[];
  isAuthenticated: boolean;
}) => {
  return (
    <div className="flex gap-4">
      {navList.map((nav, index) => (
        <NavMenu key={index} {...nav} />
      ))}
      {isAuthenticated && <SignOutButton />}
    </div>
  );
};

export default NavMenuList;
