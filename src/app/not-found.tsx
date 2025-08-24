export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center text-center p-8">
      <div>
        <h1 className="text-2xl font-semibold">ページが見つかりません</h1>
        <p className="text-sm text-gray-500 mt-2">URL をご確認ください。</p>
        <a href="/" className="inline-block mt-4 text-blue-600 hover:underline">
          トップへ戻る
        </a>
      </div>
    </main>
  );
}
