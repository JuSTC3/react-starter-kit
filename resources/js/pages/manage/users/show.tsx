import Page from "@/components/ui/page";
import { UserForm } from "@/components/forms/user-form";
import { type BreadcrumbItem, User } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Manage Dashboard", href: "/manage/users" },
    { title: "Users", href: "/manage/users" },
    { title: "View", href: "/manage/users/view" },
];

const [TITLE, SUBTITLE] = ["View User", "View user details without making changes."];

interface ViewUserProps {
    user: User;
}

export default function ViewUser({ user }: ViewUserProps) {
    return (
        <Page title={TITLE} subtitle={SUBTITLE} breadcrumbs={breadcrumbs}>
            <UserForm user={user} readOnly={true} />
        </Page>
    );
}