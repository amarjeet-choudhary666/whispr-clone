import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
  isTranscribing: boolean;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  transcription,
  isTranscribing,
}) => {
  return (
    <div className="transcription-display">
      <h2>Transcription</h2>
      <div className="transcription-text">
        {isTranscribing && <span className="transcribing-indicator">Transcribing...</span>}
        <p>{transcription || 'Start recording to see transcription here.'}</p>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;