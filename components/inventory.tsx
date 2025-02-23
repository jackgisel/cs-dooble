import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InventoryProps {
  items: Item[];
  onSellItem: (id: number) => void;
  onSellAll: () => void;
}

export default function Inventory({
  items,
  onSellItem,
  onSellAll,
}: InventoryProps) {
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Inventory</h2>
        {items.length > 0 && (
          <div className="flex items-center gap-4">
            <p className="text-gray-300">
              Total Value: ${totalValue.toFixed(2)}
            </p>
            <Button
              onClick={onSellAll}
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-black"
            >
              <Icons.trash className="h-4 w-4 mr-2 text-black" />
              Sell All
            </Button>
          </div>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-gray-300">
          Your inventory is empty. Open cases to get items!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-gray-800 rounded-lg p-4 text-center group relative">
                    <div
                      className={`w-16 h-16 ${item.color} rounded-lg mx-auto mb-2`}
                    />
                    <h3 className="font-semibold truncate text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">{item.rarity}</p>
                    <p className="text-sm text-green-500 mb-3">
                      ${item.value.toFixed(2)}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSellItem(item.id)}
                      className="w-full bg-white hover:bg-gray-100 text-black"
                    >
                      Sell
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700">
                  <p className="text-white">
                    Click to sell for ${item.value.toFixed(2)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </div>
  );
}
