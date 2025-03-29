import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium justify-between">
                    <AppLogoIcon className="mr-2 w-auto h-6 size-8 fill-current text-white" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
                <div className="flex w-full max-w-md flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Card className="rounded-xl">
                            <CardHeader className="px-10 pt-2 pb-0 text-center">
                                <CardTitle className="text-xl">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-10 py-2">{children}</CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
