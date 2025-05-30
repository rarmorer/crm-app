import { set } from "date-fns";
import React, { useEffect, useState } from "react";

export default function VoiceAuth() {

  const [voicePrompt, setVoicePrompt] = useState(false);
  const [iseRecording, setIsRecording] = useState(false);
  
  console.log(voicePrompt, 'status')

  useEffect(() => {
    const messageHandler = (event) => {
      const { type, data } = event.data || {};
//seemingly no differentiation between call connected and call rejected
      switch (type) {
        case 'zcc-call-connected':
          console.log('Call Connected:', data);
          setVoicePrompt(true);

          break;
        case 'zcc-call-ended':
          console.log('Call Ended:', data);
          
          break;
        default:
          console.log(`⚠️ Unhandled Smart Embed event: ${type}`, data);
      }
    };

    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const recordVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder = new MediaRecorder(stream);
      const bites = [];

      recorder.ondataavailable = (e) => bites.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob (bites, { type: 'audio/webm'});
        console.log('samle recorded', blob);

      alert('voice verification successful!');
      setVoicePrompt(false);
      setClickable(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {voicePrompt ? alert('speak for voice authentication') : 'test'}
    </div>
  );
}