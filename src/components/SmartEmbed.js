// components/MockSoftphone.js
export default function SmartEmbed() {
  return (
    <div className="w-full max-w-md mx-auto rounded-xl shadow-md p-4 bg-white border border-gray-200 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">📞 Mock Softphone</h2>

      <input
        type="text"
        placeholder="Enter number"
        className="w-full px-3 py-2 border rounded-md"
        disabled
      />

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600">
          Call
        </button>

        <span className="text-gray-600 text-sm">
          Status: <strong>Idle</strong>
        </span>
      </div>
    </div>
  )
}
