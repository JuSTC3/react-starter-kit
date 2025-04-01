import { Icon } from '@/components/icon';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'; // Ensure these are imported
import { ChevronUp } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const page = usePage();

    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={page.url.startsWith(item.href)}
                                        tooltip={{ children: item.title }}
                                    >
                                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                        {item.title}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className="w-[var(--radix-popper-anchor-width)]">
                                    {item.sub?.map((subItem) => (
                                        <div key={subItem.title}>
                                            {subItem.sub ? (
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>
                                                        {subItem.icon && (
                                                            <subItem.icon className="h-4 w-4 mr-2" />
                                                        )}
                                                        <span>{subItem.title}</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            {subItem.sub.map((nestedItem) => (
                                                                <DropdownMenuItem key={nestedItem.title} asChild>
                                                                    <Link
                                                                        className="flex items-center w-full px-2 py-1 cursor-pointer"
                                                                        href={nestedItem.href}
                                                                        prefetch
                                                                    >
                                                                        {nestedItem.icon && (
                                                                            <nestedItem.icon className="h-4 w-4" />
                                                                        )}
                                                                        <span>{nestedItem.title}</span>
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                            ) : (
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        className="flex items-center w-full px-2 py-1 cursor-pointer"
                                                        href={subItem.href}
                                                        prefetch
                                                    >
                                                        {subItem.icon && (
                                                            <subItem.icon className="h-4 w-4" />
                                                        )}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}