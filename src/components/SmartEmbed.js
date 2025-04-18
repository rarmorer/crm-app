export default function MockSoftphone() {
  return (
    <div className="w-full max-w-md mx-auto rounded-xl shadow-md p-4 bg-white border border-gray-200 space-y-4">
      <iframe
        src="https://zoom.us/crm-int/callbar/?origin=YOUR_DOMAIN"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
        allow="autoplay; microphone; camera; display-capture; midi; encrypted-media; clipboard-write;"
        id="zoom-embeddable-phone-iframe"
        style={{ height: '800px', width: '420px' }}
      ></iframe>
    </div>
  );
}
