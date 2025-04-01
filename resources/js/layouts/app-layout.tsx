import { PageSkeleton } from '@/components/ui/skeletons/page-skeleton';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, FC, useState, useEffect } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout: FC<AppLayoutProps> = ({ children, breadcrumbs, ...props }) => {
    const [isRendering, setRendering] = useState(true);

    useEffect(() => {
        if (children) {
            setRendering(false);
        }
    }, [children]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {isRendering ? (
                <PageSkeleton />
            ) : (
                children
            )}
        </AppLayoutTemplate>
    );
};

export default AppLayout;
