import { motion } from "framer-motion";
import PaddedSection from "./paddedSection";
import ApplicationsClosedDialog from "./ApplicationsClosedDialog";
import { useState } from "react";

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

interface MobileNavigationProps {
  menu: Menu;
  onItemClick: () => void;
  isOpen: boolean;
}

const MobileNavigation = ({ menu, onItemClick, isOpen }: MobileNavigationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItems = menu.items.map((item) => (
    <div key={item.id} className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-springBlue">{item.label}</h3>
      {item.submenu && (
        <div className="flex flex-col gap-2">
          {item.submenu.map((subItem) => (
            <a
              key={subItem.id}
              href={subItem.url}
              onClick={onItemClick}
              className="text-springText/80 hover:text-springBlue transition-colors"
            >
              {subItem.label}
            </a>
          ))}
        </div>
      )}
    </div>
  ));

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="fixed inset-0 z-40 bg-white md:hidden"
    >
      <motion.div variants={menuVariants} className="h-full">
        <PaddedSection className="flex h-full flex-col">
          <div className="mt-6 flex flex-1 flex-col gap-8">{menuItems}</div>

          <div className="mt-auto">
            <button
              onClick={() => {
                setIsDialogOpen(true);
                onItemClick();
              }}
              className="btn-hover-effect mt-6 block w-full rounded-lg bg-white py-4 text-center text-xl font-bold text-springBlue"
            >
              Apply
            </button>
          </div>
        </PaddedSection>
      </motion.div>

      {/* Applications Closed Dialog */}
      <ApplicationsClosedDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </motion.div>
  );
};

export default MobileNavigation;
