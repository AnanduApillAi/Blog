// app/blog/layout 
import Header from "@/components/Header"
import {SearchBar} from "../../components/SearchBar"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <SearchBar />
      </div>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}