"use client";

import InventoryPreview from "@/components/inventory-preview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { type Item } from "@/lib/items";
import { useState } from "react";

interface HeaderProps {
  balance: number;
  inventory: Item[];
  onDeposit: (amount: number) => void;
}

export default function Header({ balance, inventory, onDeposit }: HeaderProps) {
  const [depositAmount, setDepositAmount] = useState("");

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(amount);
      setDepositAmount("");
    }
  };

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CS-Dooble</h1>
        <div className="flex items-center gap-6">
          <InventoryPreview items={inventory} />
          <span className="text-lg">Balance: ${balance.toFixed(2)}</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Deposit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
              <DialogHeader>
                <DialogTitle>Deposit Funds</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the amount you'd like to deposit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="deposit"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={handleDeposit}>
                  Deposit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
