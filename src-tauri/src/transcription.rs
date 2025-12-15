use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct DeepgramResponse {
    results: Results,
}

#[derive(Serialize, Deserialize, Debug)]
struct Results {
    channels: Vec<Channel>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Channel {
    alternatives: Vec<Alternative>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Alternative {
    transcript: String,
}

pub async fn transcribe_audio_bytes(audio_data: Vec<u8>) -> Result<String, Box<dyn std::error::Error>> {
    let api_key = "31c605bddb267520e366537e60a581fb3beef8b5";
    let url = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true";

    let client = Client::new();

    // Assume audio_data is in a format Deepgram accepts, e.g., WAV or raw PCM
    let response = client
        .post(url)
        .header("Authorization", format!("Token {}", api_key))
        .header("Content-Type", "audio/webm")
        .body(audio_data)
        .send()
        .await?;

    if response.status().is_success() {
        let deepgram_response: DeepgramResponse = response.json().await?;
        if let Some(channel) = deepgram_response.results.channels.first() {
            if let Some(alternative) = channel.alternatives.first() {
                return Ok(alternative.transcript.clone());
            }
        }
    } else {
        let status = response.status();
        let text = response.text().await.unwrap_or_else(|_| "Failed to read response text".to_string());
        return Err(format!("Transcription failed with status: {} - {}", status, text).into());
    }

    Err("Transcription failed: No transcript found".into())
}