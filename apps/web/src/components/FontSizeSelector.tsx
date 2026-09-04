import { t } from "@lingui/core/macro";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import type { FontSize } from "~/providers/font-size";
import { useFontSize } from "~/providers/font-size";

const fontSizeOptions: { value: FontSize; label: () => string }[] = [
  { value: "small", label: () => t`Small` },
  { value: "medium", label: () => t`Medium` },
  { value: "large", label: () => t`Large` },
];

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="relative">
      <HiOutlineAdjustmentsHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-light-900" />
      <select
        id="font-size-select"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value as FontSize)}
        className="block w-full max-w-[180px] rounded-lg border-0 bg-panel pl-10 text-sm shadow-sm ring-1 ring-inset ring-hairline focus:ring-2 focus:ring-inset focus:ring-hairline dark:text-dark-1000 dark:ring-hairline dark:focus:ring-hairline"
      >
        {fontSizeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label()}
          </option>
        ))}
      </select>
    </div>
  );
}
