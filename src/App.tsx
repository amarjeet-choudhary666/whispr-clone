import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import VoiceRecorder from "./components/VoiceRecorder";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
import RecordingControls from "./components/RecordingControls";
import "./App.css";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioData = Array.from(new Uint8Array(arrayBuffer));

        setIsTranscribing(true);
        if (typeof invoke !== 'function') {
          setTranscription("Tauri invoke not available. Please run the app with Tauri.");
          setIsTranscribing(false);
          return;
        }
        try {
          const transcript = await invoke("transcribe_audio", { audioData }) as string;
          setTranscription(transcript);
        } catch (error) {
          console.error("Transcription failed:", error);
          setTranscription(`Transcription failed: ${error}`);
        } finally {
          setIsTranscribing(false);
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <main className="container">
      <h1>Voice-to-Text App</h1>
      <TranscriptionDisplay
        transcription={transcription}
        isTranscribing={isTranscribing}
      />
      <VoiceRecorder
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
      <RecordingControls
        isRecording={isRecording}
        onStart={handleStartRecording}
        onStop={handleStopRecording}
      />
    </main>
  );
}

export default App;
