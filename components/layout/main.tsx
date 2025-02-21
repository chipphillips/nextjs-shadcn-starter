interface MainProps {
  children: React.ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main className="container flex-1 md:pl-[240px]">
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1 py-8">{children}</div>
      </div>
    </main>
  )
}