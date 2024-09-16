import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 rounded bg-white bg-opacity-75 backdrop-blur shadow">
      <button
        className="w-full flex justify-between items-center gap-4 text-left py-4 px-2 text-lg font-medium focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        {
            isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
        }
      </button>
      <motion.div
        initial={true}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};


export default Accordion;
