import { useState, useRef } from "react";
import { invoke, isTauri } from "@tauri-apps/api/core";
import VoiceRecorder from "./components/VoiceRecorder";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
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
        const audioData = new Uint8Array(arrayBuffer);

        setIsTranscribing(true);
        if (!isTauri()) {
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
    <div className="app-wrapper">
      <main className="container">
        <div className="header">
          <h1 className="app-title">Whispr</h1>
          <p className="app-subtitle">Voice to text, beautifully simple</p>
        </div>
        
        <TranscriptionDisplay
          transcription={transcription}
          isTranscribing={isTranscribing}
        />
        
        <VoiceRecorder
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      </main>
    </div>
  );
}

export default App;

