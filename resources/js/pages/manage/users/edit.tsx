import Page from "@/components/ui/page";
import { UserForm } from "@/components/forms/user-form";
import { type BreadcrumbItem, User } from "@/types";
import { usePage } from "@inertiajs/react";

const [TITLE, SUBTITLE] = ["Edit User", "Update an existing user’s details."];

export default function EditUser() {
    const { props } = usePage<{ user: User }>(); // Assuming User includes id, name, email
    const { user } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Manage Dashboard", href: "/manage/users" },
        { title: "Users", href: "/manage/users" },
        { title: "Edit", href: `/manage/users/${user.id}/edit` },
    ];

    return (
        <Page title={TITLE} subtitle={SUBTITLE} breadcrumbs={breadcrumbs}>
            <UserForm user={user} isEdit={true} />
        </Page>
    );
}