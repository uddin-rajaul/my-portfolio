import Navigation from "@/components/navigation"
import Breadcrumb from "@/components/breadcrumb"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <Breadcrumb />
      <main>{children}</main>
    </>
  )
}
