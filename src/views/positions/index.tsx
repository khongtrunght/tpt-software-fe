import { memo } from "react";
import { PositionsTable } from "./PositionsTable";

export const PositionsView = memo(function PositionsView() {
  return (
    <div>
      <PositionsTable positions={[]} />
    </div>
  );
});
