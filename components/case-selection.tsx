"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Case {
  id: number;
  name: string;
  price: number;
  color: string;
}

interface CaseSelectionProps {
  cases: Case[];
  balance: number;
}

export default function CaseSelection({ cases, balance }: CaseSelectionProps) {
  const router = useRouter();

  const handleCaseOpen = (caseItem: Case) => {
    if (balance >= caseItem.price) {
      router.push(
        `/open?case=${caseItem.id}&name=${encodeURIComponent(caseItem.name)}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cases.map((caseItem) => (
        <div
          key={caseItem.id}
          className="bg-gray-800 rounded-lg p-4 text-center"
        >
          <div
            className={`w-24 h-24 ${caseItem.color} rounded-lg mx-auto mb-4`}
          />
          <h3 className="text-xl font-semibold mb-2">{caseItem.name}</h3>
          <p className="text-gray-400 mb-4">${caseItem.price.toFixed(2)}</p>
          <Button
            onClick={() => handleCaseOpen(caseItem)}
            disabled={balance < caseItem.price}
          >
            Open Case
          </Button>
        </div>
      ))}
    </div>
  );
}
