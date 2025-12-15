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
        onMouseLeave={onStopRecording} // Stop if mouse leaves button
      >
        {isRecording ? '🎤 Recording...' : '🎤 Hold to Record'}
      </button>
      <p>Push and hold the button to start recording</p>
    </div>
  );
};

export default VoiceRecorder;