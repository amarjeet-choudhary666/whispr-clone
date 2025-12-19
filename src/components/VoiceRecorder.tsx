import React from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  return (
    <div className="voice-recorder">
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onMouseDown={onStartRecording}
        onMouseUp={onStopRecording}
        onMouseLeave={onStopRecording}
        onTouchStart={(e) => {
          e.preventDefault();
          onStartRecording();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          onStopRecording();
        }}
      >
        <span className="icon">{isRecording ? '🎤' : '🎙️'}</span>
        <span className="text">{isRecording ? 'Recording' : 'Tap to Record'}</span>
      </button>
      <p>{isRecording ? 'Release to stop recording' : 'Press and hold to record your voice'}</p>
    </div>
  );
};

export default VoiceRecorder;