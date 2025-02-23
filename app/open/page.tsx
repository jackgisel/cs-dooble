"use client";

import CaseOpening from "@/components/case-opening";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { cases } from "@/lib/cases";
import { useGameState } from "@/lib/hooks/useGameState";
import { type Item, selectItemByWeight } from "@/lib/items";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function OpenPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState<Item | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const { balance, inventory, updateBalance, updateInventory } = useGameState();

  // Get case details from URL params
  const caseName = searchParams.get("name");
  const caseId = searchParams.get("case");
  const caseDetails = cases.find((c) => c.id === Number(caseId));

  const handleStartSpin = async () => {
    if (!caseDetails) return;

    setHasStarted(true);
    // Deduct case price from balance
    await updateBalance(balance - caseDetails.price);

    // Start opening animation
    const winningItem = selectItemByWeight(caseDetails.items);
    const itemWithId = { ...winningItem, id: Math.random() };
    setOpenedItem(itemWithId);
    setIsOpening(true);

    // Add item to inventory after spin completes
    setTimeout(async () => {
      setIsOpening(false);
      await updateInventory([...inventory, itemWithId]);
    }, 5000);
  };

  const handleDeposit = async (amount: number) => {
    await updateBalance(balance + amount);
  };

  const handleClose = () => {
    router.push("/");
  };

  if (!caseDetails) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        balance={balance}
        inventory={inventory}
        onDeposit={handleDeposit}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={handleClose}>← Back to Cases</Button>
        </div>

        {!hasStarted ? (
          <div className="text-center bg-gray-800 p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">{caseName}</h1>
            <p className="text-gray-400 mb-6">
              Price: ${caseDetails.price.toFixed(2)}
            </p>
            <Button
              onClick={handleStartSpin}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Confirm Opening
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">{caseName}</h1>
            <CaseOpening
              isOpening={isOpening}
              openedItem={openedItem}
              items={caseDetails.items}
              onClose={handleClose}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function OpenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-8 text-center">
            Loading...
          </div>
        </div>
      }
    >
      <OpenPageContent />
    </Suspense>
  );
}
