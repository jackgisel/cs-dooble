"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Item } from "@/lib/items";

interface InventoryPreviewProps {
  items: Item[];
}

export default function InventoryPreview({ items }: InventoryPreviewProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-lg hover:text-gray-300 transition-colors">
            Items: {items.length}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="end"
          className="bg-gray-800 border-gray-700 p-4 w-64"
        >
          <div className="max-h-[300px] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-400">No items</p>
            ) : (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${item.color} rounded`} />
                    <span className="flex-1">{item.name}</span>
                    <span className="text-gray-400">
                      ${item.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
