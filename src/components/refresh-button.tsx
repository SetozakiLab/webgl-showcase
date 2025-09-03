"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function RefreshButton() {
  const handleRefresh = () => {
    // Prefer a hard reload to avoid any client cache issues when Unity bundles update
    window.location.reload();
  };

  return (
    <Button variant="outline" onClick={handleRefresh}>
      <RefreshCw className="w-4 h-4 mr-2" />
      再読み込み
    </Button>
  );
}
