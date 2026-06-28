import React, { useState, useEffect } from 'react';
import { Mic, X, Activity } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';

export default function VoiceAssistantOverlay() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle -> listening -> processing -> speaking
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Auto-hide when navigating to a new screen unless voice is active
  useEffect(() => {
    if (state.currentScreen && phase === 'idle') {
      setIsOpen(false);
    }
  }, [state.currentScreen]);

  const toggleVoice = () => {
    if (isOpen) {
      setIsOpen(false);
      setPhase('idle');
      setTranscript('');
      setResponse('');
    } else {
      setIsOpen(true);
      startMockSequence(state.currentScreen);
    }
  };

  const startMockSequence = (currentScreen) => {
    setPhase('listening');
    setTranscript('');
    setResponse('');
    
    let simulatedText = [];
    let reply = "";
    let routeTo = null;

    // Define the sequence based on the current screen
    if (currentScreen === 'home' || !currentScreen) {
      simulatedText = ['Show ', 'Show my ', 'Show my budget'];
      reply = "Opening your Smart Budget Coach. You have spent 85% of your food budget this month.";
      routeTo = 'budget';
    } 
    else if (currentScreen === 'budget') {
      simulatedText = ['Create ', 'Create a ', 'Create a savings goal'];
      reply = "Opening your Smart Goals. You are on track to buy a laptop.";
      routeTo = 'goals';
    }
    else if (currentScreen === 'goals') {
      simulatedText = ['Simulate ', 'Simulate my ', 'Simulate my future net worth'];
      reply = "Opening your Digital Financial Twin. Let's explore your future net worth.";
      routeTo = 'twin';
    }
    else {
      simulatedText = ['What ', 'What is my ', 'What is my account balance?'];
      reply = `Your account balance is ₹${state.accountBalance.toLocaleString()}.`;
      routeTo = 'home';
    }

    // Simulate user speaking
    setTimeout(() => setTranscript(simulatedText[0]), 800);
    setTimeout(() => setTranscript(simulatedText[1]), 1400);
    setTimeout(() => setTranscript(simulatedText[2]), 2000);
    
    // Process intent
    setTimeout(() => {
      setPhase('processing');
    }, 2800);

    // AI Response
    setTimeout(() => {
      setPhase('speaking');
      setResponse(reply);
      
      // Execute the action (navigate)
      if (routeTo) {
        dispatch({ type: ACTIONS.CLEAR_LOGS });
        dispatch({ type: ACTIONS.SET_SCREEN, payload: routeTo });
        dispatch({ type: ACTIONS.CLOSE_MENU });
      }
    }, 4500);

    // Auto close
    setTimeout(() => {
      setIsOpen(false);
      setPhase('idle');
    }, 8000);
  };

  return (
    <>
      {/* Floating Action Button (Always Visible) */}
      <button 
        onClick={toggleVoice}
        className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all z-[60] pointer-events-auto"
      >
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <Mic className="text-white w-7 h-7" />
        )}
      </button>

      {/* Full Screen Overlay when active */}
      {isOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[50] pointer-events-auto flex flex-col justify-end pb-24 px-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col items-center justify-center text-center">
            
            {/* Visualizer */}
            <div className="flex items-end justify-center gap-1.5 h-16 mb-8">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <div 
                  key={bar} 
                  className={`w-1.5 rounded-full bg-purple-400 ${phase === 'listening' || phase === 'speaking' ? 'animate-bounce' : ''}`}
                  style={{ 
                    height: phase === 'listening' ? `${Math.max(20, Math.random() * 60)}px` : phase === 'speaking' ? `${Math.max(30, Math.random() * 80)}px` : '4px',
                    animationDelay: `${bar * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* Transcript Area */}
            <div className="min-h-[80px] w-full flex flex-col items-center justify-center">
              {phase === 'listening' && (
                <p className="text-white text-xl font-light italic">
                  {transcript || "Listening..."}
                </p>
              )}
              
              {phase === 'processing' && (
                <div className="flex flex-col items-center text-purple-300">
                  <p className="text-white text-lg font-light italic mb-3">"{transcript}"</p>
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    <span>Processing Intent...</span>
                  </div>
                </div>
              )}
              
              {phase === 'speaking' && (
                <div className="w-full flex flex-col items-center">
                  <p className="text-white/60 text-sm italic mb-4">"{transcript}"</p>
                  <div className="bg-purple-900/50 border border-purple-500/30 p-4 rounded-2xl w-full">
                    <p className="text-purple-100 text-sm">{response}</p>
                  </div>
                </div>
              )}
            </div>

            {phase === 'listening' && (
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-4">
                Auto-Demo Sequence Active
              </p>
            )}

          </div>
        </div>
      )}
    </>
  );
}
