import React from 'react';

interface RecordingControlsProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  onStart,
  onStop,
}) => {
  return (
    <div className="recording-controls">
      {!isRecording ? (
        <button onClick={onStart} className="start-button">
          Start Recording
        </button>
      ) : (
        <button onClick={onStop} className="stop-button">
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default RecordingControls;