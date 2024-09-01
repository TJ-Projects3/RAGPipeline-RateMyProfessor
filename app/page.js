"use client";
import { Box, Button, Stack, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
//import MicIcon from "@mui/icons-material/Mic";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import NavBar from "@/component/Navbar"



export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);

  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  //browser compatibility
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error("Speech Recognition API not supported");
    return <div>Speech Recognition API not supported in this browser.</div>;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false; // only listen for a single utterance
  recognition.interimResults = false; // don't return interim results
  recognition.lang = "en-US"; // language to US English


  recognition.onstart = () => {
    console.log("Speech recognition started");
    setIsListening(true);
  };

  // speech to text conversion
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log("Speech to text result:", speechToText);
    setMessage(speechToText); 
    setIsListening(false); 
  };


  recognition.onerror = (e) => {
    console.error("Speech recognition error:", e.error); 
    setIsListening(false); 
  };

  recognition.onend = () => {
    console.log("Speech recognition ended");
    setIsListening(false);
  };


  const handleVoiceInput = () => {
    if (isListening) {
      recognition.stop(); //stop listening if already active
    } else {
      recognition.start(); //start listening if inactive
    }
  };

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // if enter key is pressed without shift key, prevent default behavior, and send the message
      sendMessage(); 
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
        p={2}
      >
        <Stack
          direction="column"
          width="450px"
          height="600px"
          borderRadius={2}
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
          bgcolor="white"
          p={3}
          spacing={3}
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
            sx={{ 
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#cccccc', borderRadius: '10px' }
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  bgcolor={
                    message.role === "assistant"
                      ? "primary.main"
                      : "secondary.main"
                  }
                  color="white"
                  borderRadius="12px"
                  p={2}
                  maxWidth="75%"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                  sx={{padding: "25px"}}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Type your message..."
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              multiline
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <IconButton
              onClick={handleVoiceInput}
              color={isListening ? "secondary" : "default"}
              sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              <MicNoneRoundedIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              sx={{
                borderRadius: '8px',
                padding: '8px 16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
