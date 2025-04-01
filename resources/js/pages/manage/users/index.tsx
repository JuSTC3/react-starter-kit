import { DataTable } from '@/components/ui/datatable/data-table';
import { type BreadcrumbItem, User } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { type UsersPageProps } from '@/types';
import { DataTableColumnHeader } from '@/components/ui/datatable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { TableAction } from '@/components/ui/datatable/data-table-action';
import { Eye, Pencil, Trash } from "lucide-react";
import Page from '@/components/ui/page';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dashboard', href: '/manage/users' },
    { title: 'Users', href: '/manage/users' },
];

const [TITLE, SUBTITLE] = ["Manage Users", "View, search, and manage user accounts."];

export default function Users({ users }: UsersPageProps) {
    const getInitials = useInitials();

    const userColumns: ColumnDef<User>[] = [
        {
            id: "id",
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Id" className='ml-2' />
            ),
            cell: ({ row }) => (
                <div className='ml-2'>
                    {row.index + 1}
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const user = row.original;
                const avatar = user.avatar ?? '';
                const initials = getInitials(user.name);

                return (
                    <div className="flex items-center space-x-2">
                        <Avatar className="size-8 overflow-hidden rounded-none">
                            <AvatarImage src={avatar} alt={user.name} className='rounded-lg' />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString(),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => (
                <TableAction
                    data={row.original}
                    actions={[
                        {
                            label: "View",
                            icon: Eye,
                            onClick: (data) => console.log("View", data),
                        },
                        {
                            label: "Edit",
                            icon: Pencil,
                            onClick: (data) => router.visit(`/manage/users/${data.id}/edit`),
                        },
                        {
                            label: "Delete",
                            icon: Trash,
                            onClick: (data) => console.log("Delete", data),
                            withSeparator: true,
                            className: "danger",
                        },
                    ]}
                />
            ),
        }
    ];

    return (
        <Page title={TITLE} subtitle={SUBTITLE} breadcrumbs={breadcrumbs}>
            <DataTable data={users.data} columns={userColumns} filterColumns={["name", "email"]}  filterPlaceholder="Search..." />
        </Page>
    );
}
