import React, { ReactNode } from "react";
import * as TooltipBase from "@radix-ui/react-tooltip";

export const Tooltip = ({
  children,
  text,
  hideTooltip,
}: {
  children: ReactNode;
  text: string;
  hideTooltip?: boolean;
}) => {
  return (
    <TooltipBase.Provider delayDuration={300}>
      <TooltipBase.Root open={hideTooltip ? false : undefined}>
        <TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>
        <TooltipBase.Portal>
          <TooltipBase.Content
            className="rounded bg-gray-500 px-4 py-2 text-sm text-white shadow-[rgba(255,_255,_255,_255.24)_0px_0px_3px]"
            sideOffset={5}
          >
            {text}
            <TooltipBase.Arrow className="fill-gray-500" />
          </TooltipBase.Content>
        </TooltipBase.Portal>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  );
};
