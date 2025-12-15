use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use std::sync::mpsc;
use std::sync::{Arc, Mutex};

pub struct AudioRecorder {
    stream: Option<cpal::Stream>,
    sender: mpsc::Sender<Vec<f32>>,
    receiver: Arc<Mutex<mpsc::Receiver<Vec<f32>>>>,
}

impl AudioRecorder {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let host = cpal::default_host();
        let device = host.default_input_device().ok_or("No input device available")?;
        let config = device.default_input_config()?;

        let (sender, receiver) = mpsc::channel();
        let receiver = Arc::new(Mutex::new(receiver));

        let receiver_clone = Arc::clone(&receiver);
        let sender_clone = sender.clone();

        let stream = device.build_input_stream(
            &config.into(),
            move |data: &[f32], _: &cpal::InputCallbackInfo| {
                let buffer = data.to_vec();
                if let Err(_) = sender_clone.send(buffer) {
                    // Receiver dropped, stop sending
                }
            },
            move |err| {
                eprintln!("Audio stream error: {}", err);
            },
            None,
        )?;

        Ok(AudioRecorder {
            stream: Some(stream),
            sender,
            receiver,
        })
    }

    pub fn start(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        if let Some(stream) = &self.stream {
            stream.play()?;
        }
        Ok(())
    }

    pub fn stop(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        if let Some(stream) = &self.stream {
            stream.pause()?;
        }
        Ok(())
    }

    pub fn get_audio_data(&self) -> Vec<f32> {
        let mut data = Vec::new();
        if let Ok(receiver) = self.receiver.lock() {
            while let Ok(chunk) = receiver.try_recv() {
                data.extend(chunk);
            }
        }
        data
    }
}