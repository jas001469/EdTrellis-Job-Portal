import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Job Portal",
  description: "Find jobs and hire talent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
