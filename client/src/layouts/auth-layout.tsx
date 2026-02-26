
interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}
export default function AuthLayout({children, title, subtitle}: AuthLayoutProps) {
  return (
    <div className="bg-white py-10">
      <div className="max-w-[480px] w-[90%] space-y-4 mx-auto">
        <div className="w-fit mx-auto">
         <img src="/logo.png" alt="protection pools Logo" width={80} height={80} />
        </div>
        <div className="text-center border-b border-line pb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-muted">
            {subtitle}
          </p>
        </div>
        {children}
    </div>
    </div>
  )
}
