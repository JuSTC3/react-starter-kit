import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Action {
    label: string;
    onClick: (data: any) => void;
    icon?: LucideIcon; // Optional icon support
    withSeparator?: boolean; // Optional separator before this action
    className?: string; // Optional custom styles
}

interface TableActionProps {
    data: any;
    actions: Action[]; // List of dynamic actions
}

const getActionClasses = (type?: string) => {
    switch (type) {
        case "danger":
            return "text-red-500 hover:!bg-red-500 hover:!text-white";
        case "success":
            return "text-green-500 hover:!bg-green-500 hover:!text-white";
        case "warning":
            return "text-yellow-500 hover:!bg-yellow-500 hover:!text-white";
        case "info":
            return "text-blue-500 hover:!bg-blue-500 hover:!text-white";
        default:
            return "";
    }
};

export function TableAction({ data, actions }: TableActionProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {actions.map((action, index) => {
                    const actionClass = getActionClasses(action.className);

                    return (
                        <div key={index}>
                            {action.withSeparator && <DropdownMenuSeparator />}
                            <DropdownMenuItem
                                className={`cursor-pointer flex items-center gap-2 ${actionClass}`}
                                onClick={() => action.onClick(data)}
                            >
                                {action.icon && <action.icon className={`h-4 w-4 hover:!text-white`} />}
                                {action.label}
                            </DropdownMenuItem>
                        </div>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
