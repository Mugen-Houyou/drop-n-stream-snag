
import * as React from "react";
import { Progress } from "@/components/ui/progress";

type Props = {
  value: number;   // 0 ~ 100
};

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full max-w-xl mt-6">
      <Progress value={value} className="h-3" />
      <div className="text-xs mt-2 text-muted-foreground text-right">
        {value < 100 ? `${value.toFixed(0)}%` : "완료"}
      </div>
    </div>
  );
}
