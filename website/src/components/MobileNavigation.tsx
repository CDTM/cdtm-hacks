import { motion } from "framer-motion";
import { AnimatedLink } from "./animatedLink";
import PaddedSection from "./paddedSection";

interface SubMenuItem {
  id: string;
  label: string;
  url: string;
}

interface MenuItem {
  id: string;
  label: string;
  submenu?: SubMenuItem[];
}

interface Menu {
  items: MenuItem[];
}
interface Props {
  menu: Menu;
  onItemClick: () => void;
  isOpen: boolean;
}
const navigationVariants = {
  open: { y: 0, display: "flex" },
  closed: {
    y: "-100%",
    transitionEnd: {
      display: "none",
    },
  },
};

const menuVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.35,
      ease: "easeIn",
    },
  },
  closed: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export default function MobileNavigation({ menu, onItemClick, isOpen }: Props) {
  const menuItems = menu.items.map((item) => (
    <MobileMenuItem key={item.id} item={item} onItemClick={onItemClick} />
  ));

  return (
    <motion.nav
      key="mobile-navigation"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={navigationVariants}
      transition={{ duration: 0.5, ease: "circInOut" }}
      className="absolute inset-0 top-[72px] z-20 flex-col bg-springBlue md:hidden h-[100vh]"
    >
      <motion.div variants={menuVariants} className="h-full">
        <PaddedSection className="flex h-full flex-col">
          <div className="mt-6 flex flex-1 flex-col gap-8">{menuItems}</div>

          <div className="mt-auto">
            <a
              href="https://app.formbricks.com/s/cm87i0iq40000ji039uyra9hq"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onItemClick}
              className="btn-hover-effect mt-6 block w-full rounded-lg bg-white py-4 text-center text-xl font-bold text-springBlue"
            >
              Apply
            </a>
          </div>
        </PaddedSection>
      </motion.div>
    </motion.nav>
  );
}

function MobileMenuItem({
  item,
  onItemClick,
}: {
  item: MenuItem;
  onItemClick: () => void;
}) {
  const subMenuItems = item.submenu?.map((subitem) => (
    <MobileSubMenuItem
      key={subitem.id}
      item={subitem}
      onItemClick={onItemClick}
    />
  ));

  return <div className="flex w-full flex-col gap-4">{subMenuItems}</div>;
}

function MobileSubMenuItem({
  item,
  onItemClick,
}: {
  item: SubMenuItem;
  onItemClick: () => void;
}) {
  return (
    <AnimatedLink
      className="text-xl font-bold text-white"
      href={item.url}
      text={item.label}
      onClick={onItemClick}
      underlineInitial={false}
      colorHover="#fff"
    />
  );
}
