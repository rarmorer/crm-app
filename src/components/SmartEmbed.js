export default function SmartEmbed() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <iframe
        src="https://zoom.us/cci/callbar/crm/?origin=https://028a-38-99-100-7.ngrok-free.app"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
        allow=";autoplay;microphone;camera;display-capture;midi;encrypted-media;clipboard-write;"
        id="zoom-embeddable-phone-iframe"
        className="w-[840px] h-[700px] border-none"
      ></iframe>
    </div>
  );
}
