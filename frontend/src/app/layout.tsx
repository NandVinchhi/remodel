import type { Metadata } from 'next'
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Remodel - Custom AI workflows',
  description: 'Custom AI workflows made easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
