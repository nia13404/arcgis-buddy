import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="layout-main">
          <div className="layout-main"> {children} </div>
        </div>
      </body>
    </html>
  )
}
