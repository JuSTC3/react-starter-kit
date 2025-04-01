import AppLayout from '@/layouts/app-layout';
import PageCard from '@/components/ui/page-card';
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';

interface PageProps {
    title: string;
    subtitle?: string;
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode;
}

export default function Page({ title, subtitle, breadcrumbs, children }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <PageCard border={true} title={title} subtitle={subtitle}>
                {children}
            </PageCard>
        </AppLayout>
    );
}
