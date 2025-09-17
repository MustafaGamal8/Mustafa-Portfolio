import type { Metadata } from "next";
import { ThemeProvider } from '@/components/portfolio/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "Portfolio Embed Demo - Customizable Widget",
  description: "Test and customize your embeddable portfolio card widget",
};

export default function EmbedDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}