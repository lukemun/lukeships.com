import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Door",
};

export default function DoorPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <button
        type="button"
        className="cursor-pointer select-none border-2 border-black bg-white px-12 py-4 font-mono text-lg font-bold tracking-widest text-black uppercase translate-y-0 shadow-[0_8px_0_0_black] transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-1 hover:shadow-[0_4px_0_0_black] hover:duration-150 hover:ease-in active:translate-y-2 active:shadow-[0_0px_0_0_black] active:duration-50"
      >
        LET ME IN
      </button>
    </div>
  );
}
