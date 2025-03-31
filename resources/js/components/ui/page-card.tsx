import { Separator } from "@/components/ui/separator"

interface PageCardProps {
    title?: string | '';
    subtitle?: string | '';
    border?: boolean | false;
    children: React.ReactNode;
}

const PageCard: React.FC<PageCardProps> = ({ title, subtitle, border, children }) => {
    const padding = border ? 'p-6' : 'p-8';

    return (
        <div className={padding}>
            <div className={`flex h-full flex-1 flex-col space-y-8 rounded-xl md:flex ${border ? 'border ' + padding : ''}`}>
                {title && (
                    <>
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                                <p className="text-muted-foreground">{subtitle}</p>
                            </div>
                        </div>
                        <Separator />
                    </>
                )}
                {children}
            </div>
        </div>
    );
};

export default PageCard;

