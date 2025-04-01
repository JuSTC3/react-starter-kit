import { Skeleton } from "@/components/ui/skeleton";
import { Hourglass } from "lucide-react";

export function PageSkeleton() {
    return (
        <div className="flex flex-col h-full p-4 space-y-3">
            <Skeleton className="flex h-full rounded-xl items-center justify-center">
                <Hourglass className="animate-spin duration-1200 w-8 h-8" />
            </Skeleton>
        </div>
    );
}
