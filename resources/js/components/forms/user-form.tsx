import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { User } from "@/types";

interface UserFormProps {
    user?: User; // Entire user object, optional for create mode
    readOnly?: boolean;
    isEdit?: boolean;
}

export function UserForm({ user, readOnly = false, isEdit = false }: UserFormProps) {
    const { data, setData, post, patch, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        confirmPassword: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const method = isEdit ? patch : post;
        const routeName = isEdit ? "users.update" : "users.store";
        // Use user.id in edit mode, fallback to no param for create mode
        const url = isEdit && user?.id ? route(routeName, user.id) : route(routeName);

        method(url, {
            preserveScroll: true,
            onSuccess: () => {
                if (!isEdit) {
                    setData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset on create
                }
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Name & Email in Same Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        disabled={readOnly || processing}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        disabled={readOnly || processing || isEdit} // Disable email in edit mode
                    />
                    <InputError message={errors.email} />
                </div>
            </div>

            {/* Password & Confirm Password in Same Row */}
            {!readOnly && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="password">
                            {isEdit ? "New Password (optional)" : "Password"}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="********"
                            value={data.confirmPassword}
                            onChange={(e) => setData("confirmPassword", e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.confirmPassword} />
                    </div>
                </div>
            )}

            {!readOnly && (
                <Button type="submit" disabled={processing}>
                    {processing ? "Saving..." : isEdit ? "Update User" : "Create User"}
                </Button>
            )}
        </form>
    );
}