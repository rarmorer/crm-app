export default function SmartEmbed() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="rounded-xl shadow-md bg-white border border-gray-200 overflow-hidden">
      <iframe
        src="https://zoom.us/cci/callbar/crm/?origin=https://https://9f7c-64-187-131-142.ngrok-free.app"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
        allow=";autoplay;microphone;camera;display-capture;midi;encrypted-media;clipboard-write;"
        id="zoom-embeddable-phone-iframe"
      ></iframe>
      </div>
    </div>
  );
}
