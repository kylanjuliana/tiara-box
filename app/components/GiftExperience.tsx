"use client";

import { useState } from "react";
import { TiaraBox } from "./TiaraBox";
import { Countdown } from "./Countdown";

export function GiftExperience() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <Countdown onComplete={() => setUnlocked(true)} />
      <div className="mt-8 flex flex-col items-center">
        <TiaraBox unlocked={unlocked} />
      </div>
    </>
  );
}

