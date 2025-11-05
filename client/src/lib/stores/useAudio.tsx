import { create } from "zustand";
import { toast } from "sonner";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  isInitialized: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  
  // Initialize sounds
  initSounds: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: true, // Start muted by default
  isInitialized: false,
  
  initSounds: () => {
    const state = get();
    if (state.isInitialized) return;
    
    try {
      // Initialize hit sound
      if (!state.hitSound) {
        const hitSound = new Audio('/sounds/hit.mp3');
        hitSound.volume = 0.3;
        set({ hitSound });
      }
      
      // Initialize success sound
      if (!state.successSound) {
        const successSound = new Audio('/sounds/success.mp3');
        successSound.volume = 0.4;
        set({ successSound });
      }
      
      set({ isInitialized: true });
    } catch (error) {
      // Error initializing sounds
    }
  },
  
  setBackgroundMusic: (music) => {
    // Configure the music
    music.loop = true;
    music.volume = 0.2;
    set({ backgroundMusic: music });
  },
  
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  
  toggleMute: () => {
    const { backgroundMusic, isMuted } = get();
    const newMutedState = !isMuted;
    
    // Update the muted state
    set({ isMuted: newMutedState });
    
    // Handle background music playback
    if (backgroundMusic) {
      if (newMutedState) {
        backgroundMusic.pause();
        toast.info('Sound muted');
      } else {
        backgroundMusic.play().catch(() => {
          toast.error('Audio playback requires user interaction first. Click anywhere to enable sound.');
        });
        toast.success('Sound enabled');
      }
    }
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound && !isMuted) {
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(() => {});
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound && !isMuted) {
      // Clone for potential overlapping playback
      const soundClone = successSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.4;
      soundClone.play().catch(() => {});
    }
  }
}));
