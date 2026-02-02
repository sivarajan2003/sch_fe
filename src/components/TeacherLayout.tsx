import Header from "./Header";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* TOP HEADER */}
      <Header />

      {/* FULL WIDTH CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
