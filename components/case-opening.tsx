"use client";

import { Button } from "@/components/ui/button";
import { type Item } from "@/lib/items";
import { useCallback, useEffect, useRef, useState } from "react";

const ITEM_WIDTH = 160; // Width of each item
const ITEMS_TO_SHOW = 7; // Must be odd number for center alignment
const SPIN_DURATION = 5000;
const TOTAL_ITEMS = 100;
const CENTER_INDEX = Math.floor(ITEMS_TO_SHOW / 2); // Index of center item in view

interface CaseOpeningProps {
  isOpening: boolean;
  openedItem: Item | null;
  items: Item[];
  onClose: () => void;
}

export default function CaseOpening({
  isOpening,
  openedItem,
  items,
  onClose,
}: CaseOpeningProps) {
  const [spinnerItems, setSpinnerItems] = useState<Item[]>([]);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const hasSpunRef = useRef(false);
  const spinningAudioRef = useRef<HTMLAudioElement | null>(null);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastTickTimeRef = useRef(0);

  // Initialize audio on component mount
  useEffect(() => {
    spinningAudioRef.current = new Audio("/sounds/spinning.mp3");
    spinningAudioRef.current.volume = 0.5;

    tickAudioRef.current = new Audio("/sounds/tick.mp3");
    tickAudioRef.current.volume = 0.2;

    return () => {
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
        spinningAudioRef.current = null;
      }
      if (tickAudioRef.current) {
        tickAudioRef.current.pause();
        tickAudioRef.current = null;
      }
    };
  }, []);

  // Function to play tick sound with rate limiting
  const playTickSound = useCallback(() => {
    const now = Date.now();
    // Only play if enough time has passed since last tick (prevent too many sounds)
    if (now - lastTickTimeRef.current > 50 && tickAudioRef.current) {
      tickAudioRef.current.currentTime = 0;
      tickAudioRef.current.play();
      lastTickTimeRef.current = now;
    }
  }, []);

  // Add animation listener to play tick sounds
  useEffect(() => {
    if (!spinnerRef.current || !isOpening) return;

    let animationFrame: number;
    const element = spinnerRef.current;
    const centerPosition = (ITEM_WIDTH * ITEMS_TO_SHOW) / 2;

    const checkPosition = () => {
      if (!element) return;

      const transform = getComputedStyle(element).transform;
      const matrix = new DOMMatrix(transform);
      const currentX = Math.abs(matrix.m41); // Get current X position

      // Calculate which item is at the center
      const itemIndex = Math.floor(currentX / ITEM_WIDTH);

      // If we've moved one full item width since last tick
      if (
        Math.floor(currentX / ITEM_WIDTH) !==
        Math.floor(lastTickTimeRef.current / ITEM_WIDTH)
      ) {
        playTickSound();
      }

      if (isOpening) {
        animationFrame = requestAnimationFrame(checkPosition);
      }
    };

    animationFrame = requestAnimationFrame(checkPosition);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isOpening, playTickSound]);

  const generateSpinnerItems = useCallback(() => {
    // Generate initial random items
    const randomItems = Array(TOTAL_ITEMS)
      .fill(null)
      .map(() => items[Math.floor(Math.random() * items.length)]);

    if (openedItem) {
      // Place winning item at position that will end up in center
      const winningPosition = Math.floor(
        TOTAL_ITEMS - ITEMS_TO_SHOW + ITEMS_TO_SHOW / 2
      );
      randomItems[winningPosition] = openedItem;
    }

    return randomItems;
  }, [items, openedItem]);

  useEffect(() => {
    if (isOpening && !hasSpunRef.current && spinnerRef.current) {
      const newSpinnerItems = generateSpinnerItems();
      setSpinnerItems(newSpinnerItems);
      hasSpunRef.current = true;

      // Reset position
      spinnerRef.current.style.transition = "none";
      spinnerRef.current.style.transform = "translateX(0)";
      spinnerRef.current.offsetHeight;

      // Play spinning sound
      if (spinningAudioRef.current) {
        spinningAudioRef.current.currentTime = 0;
        spinningAudioRef.current.play();
      }

      // Start animation
      requestAnimationFrame(() => {
        if (spinnerRef.current) {
          spinnerRef.current.style.transition = `transform ${SPIN_DURATION}ms cubic-bezier(0.15, 0.85, 0.35, 1)`;
          const finalPosition = ITEM_WIDTH * (TOTAL_ITEMS - ITEMS_TO_SHOW);
          spinnerRef.current.style.transform = `translateX(-${finalPosition}px)`;
        }
      });

      // Stop spinning sound after animation
      setTimeout(() => {
        if (spinningAudioRef.current) {
          spinningAudioRef.current.pause();
          spinningAudioRef.current.currentTime = 0;
        }
      }, SPIN_DURATION);
    }
  }, [isOpening, generateSpinnerItems]);

  useEffect(() => {
    if (!isOpening) {
      hasSpunRef.current = false;
    }
  }, [isOpening]);

  if (!isOpening && !openedItem) return null;

  const viewportWidth = ITEM_WIDTH * ITEMS_TO_SHOW;

  return (
    <div className="mt-8 bg-gray-800 p-8 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">
        {isOpening ? "Opening Case" : "Case Opened!"}
      </h2>
      <div className="relative mx-auto mb-4">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ width: `${viewportWidth}px`, height: "128px" }}
        >
          <div
            ref={spinnerRef}
            className="absolute flex items-center h-full"
            style={{
              width: `${ITEM_WIDTH * TOTAL_ITEMS}px`,
              willChange: "transform",
            }}
          >
            {spinnerItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${ITEM_WIDTH}px`, padding: "0 8px" }}
              >
                <div
                  className={`w-full h-28 ${
                    item?.color || "bg-gray-600"
                  } rounded-lg border-2 border-gray-700`}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none z-10" />

          {/* Center line - positioned exactly in the middle */}
          <div
            className="absolute inset-y-0 bg-yellow-500 z-20"
            style={{
              left: `${(viewportWidth - 2) / 2}px`,
              width: "2px",
            }}
          />
        </div>
      </div>
      {!isOpening && openedItem && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">{openedItem.name}</h3>
          <p className="text-xl text-gray-400 mb-4">{openedItem.rarity}</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      )}
    </div>
  );
}
