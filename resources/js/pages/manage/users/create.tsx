import Page from "@/components/ui/page";
import { UserForm } from "@/components/forms/user-form";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Manage Dashboard", href: "/manage/users" },
    { title: "Users", href: "/manage/users" },
    { title: "Create", href: "/manage/users/create" },
];

const [TITLE, SUBTITLE] = ["Create User", "Add a new user to the system."];

export default function CreateUser() {
    return (
        <Page title={TITLE} subtitle={SUBTITLE} breadcrumbs={breadcrumbs}>
            <UserForm />
        </Page>
    );
}