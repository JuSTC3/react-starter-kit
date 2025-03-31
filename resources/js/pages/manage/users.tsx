import { DataTable } from '@/components/ui/datatable/data-table';
import PageCard from '@/components/ui/page-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { type UsersPageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Dashboard',
        href: '/manage/users',
    },
    {
        title: 'Users',
        href: '/manage/users',
    },
];

export default function Users() {
    const { users } = usePage<UsersPageProps>().props;

    const userColumns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString(),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <PageCard border={true} title="Manage Users" subtitle="Here's a list of the users!">
                <DataTable data={users.data} columns={userColumns} filterColumn="name" filterPlaceholder="Search by name..." />
            </PageCard>
        </AppLayout>
    );
}
