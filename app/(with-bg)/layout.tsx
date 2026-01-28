export default function WithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={
        {
          // backgroundImage:
          //   "url('https://res.cloudinary.com/duphnvqtf/image/upload/v1766613907/Gemini_Generated_Image_oggjyhoggjyhoggj_lgshhu.png')",
        }
      }
    >
      {/* dunkles Overlay für Lesbarkeit */}
      <div className="min-h-screen bg-black/80">{children}</div>
    </div>
  );
}
