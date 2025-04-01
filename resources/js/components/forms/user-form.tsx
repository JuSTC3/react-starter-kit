import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { User } from "@/types";

interface UserFormProps {
    user?: User;
    readOnly?: boolean;
    isEdit?: boolean;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: string | undefined;
}

export function UserForm({ user, readOnly = false, isEdit = false }: UserFormProps) {
    const { data, setData, post, patch, processing, errors } = useForm<FormData>({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const method = isEdit ? patch : post;
        const routeName = isEdit ? "users.update" : "users.store";
        const url = isEdit && user?.id ? route(routeName, user.id) : route(routeName);

        method(url, {
            preserveScroll: true,
            onSuccess: () => {
                if (!isEdit) {
                    setData({ name: "", email: "", password: "", password_confirmation: "" });
                } else {
                    setData("password", "");
                    setData("password_confirmation", "");
                }
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
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
                        disabled={readOnly || processing} // Allow email editing
                    />
                    <InputError message={errors.email} />
                </div>
            </div>

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
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="********"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            disabled={processing}
                        />
                        {/* Optionally show errors.password here too */}
                        <InputError message={errors.password} />
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