import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileAccordionProps {
  title: string;
  elements: {
    id: string;
    label: string;
    link: string;
  }[];
}

export const MobileAccordion = ({ title, elements }: MobileAccordionProps) => {
  const pathname = usePathname();

  return (
    <Accordion.Root className="w-full" type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger className="group flex h-[50px] w-full items-center rounded px-3 py-2 font-light text-white">
          <span className="block">{title}</span>
          <svg
            className="ms-2.5 h-2.5 w-2.5 group-aria-expanded:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="max-h-48 overflow-y-scroll">
            <ul className="py-0 text-sm text-gray-700 dark:text-gray-400">
              {elements.map((element) => (
                <li key={element.id}>
                  <Link
                    href={element.link}
                    className={`block px-4 py-2 text-gray-400 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-600 lg:dark:hover:text-white ${pathname === element.link ? "dark:text-blue-400" : ""}`}
                  >
                    {element.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
