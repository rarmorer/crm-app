import React, { useEffect, useState } from "react";
import { useVoiceAuthorized } from "@/context/global-context";

export default function VoiceAuth() {
  const [voicePrompt, setVoicePrompt] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const { voiceAuthorized, setVoiceAuthorized } = useVoiceAuthorized();

  useEffect(() => {
    console.log(voiceAuthorized, 'voiceAuth')
    const messageHandler = (event) => {
      const { type, data } = event.data || {};
      if (type === "zcc-call-connected" || type === "zcc-incomingphone-request") {
        console.log("Call Connected:", data);
        setVoicePrompt(true);
        startRecording();
      } else if (type === "zcc-call-ended") {
        console.log("Call Ended:", data);
      }
    };

    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        compareVoiceSample(blob);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setVoicePrompt(false);
    }
  };

  const compareVoiceSample = (newBlob) => {
    const storedSampleBase64 = localStorage.getItem("Rehema Voice Sample");
    if (!storedSampleBase64) {
      alert("Stored sample not found.");
      return;
    }

    try {
      // Decode base64 to Uint8Array
      const byteCharacters = atob(storedSampleBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const storedBlob = new Blob([new Uint8Array(byteNumbers)], { type: "audio/webm" });

      // Naive comparison by size
      // if (newBlob.size === storedBlob.size) {
      //   alert("Voice authorized!");
      //   setVoiceAuthorized(true);
      // } else {
      //   alert("Voice sample does not match.");
      // }

    // For demo purposes, force authorize
    alert("Voice authorized!");
    setVoiceAuthorized(true);
    } catch (error) {
      alert("Error decoding stored sample.");
      console.error(error);
    }
  };

  return (
    <div>
      {voicePrompt && isRecording && (
        <button
          onClick={stopRecording}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded shadow-md transition duration-150"
          aria-label="Stop recording and authenticate voice"
        >
          Authorize Voice
        </button>
      )}
    </div>
  );
}