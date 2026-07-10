import { useCallback, useRef, useState } from 'react';

export function useSpeechRecognition() {
  const [recording, setRecording] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [supported] = useState(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  const recognitionRef = useRef(null);
  const recognizingRef = useRef(false);

  const ensureRecognition = useCallback(() => {
    if (recognitionRef.current) return recognitionRef.current;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = 'pt-BR';
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (e) => {
      let interim = '';
      let finalChunk = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalChunk += t + ' ';
        else interim += t;
      }
      if (finalChunk) setFinalText((prev) => prev + finalChunk);
      setInterimText(interim);
    };
    rec.onend = () => {
      if (recognizingRef.current) {
        try {
          rec.start();
        } catch (e) {
          /* já iniciado, ignora */
        }
      }
    };
    recognitionRef.current = rec;
    return rec;
  }, []);

  const start = useCallback(() => {
    const rec = ensureRecognition();
    if (!rec) return false;
    recognizingRef.current = true;
    try {
      rec.start();
    } catch (e) {
      /* já iniciado */
    }
    setRecording(true);
    return true;
  }, [ensureRecognition]);

  const stop = useCallback(() => {
    recognizingRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        /* ignora */
      }
    }
    setRecording(false);
  }, []);

  const reset = useCallback(() => {
    setFinalText('');
    setInterimText('');
  }, []);

  const setDemoText = useCallback((text) => {
    setFinalText(text);
    setInterimText('');
  }, []);

  return { recording, finalText, interimText, supported, start, stop, reset, setDemoText };
}
