import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaPlayCircle,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa'

const Timer = () => {
  const hash = window.location.hash

  // Dynamically set the initial timer duration based on the path
  const initialTime = hash === '#/test' ? 5 * 61 : 8 * 60

  // State management
  const [timeLeft, setTimeLeft] = useState(initialTime) // Use dynamic initial time
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [backgroundWhite, setBackgroundWhite] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Refs for timer and message timeouts
  const timerRef = useRef(null)
  const messageTimeoutRef = useRef(null)

  // Audio refs for alerts
  const audio5 = useRef(new Audio('./5_min_alert.mp3'))
  const audio3 = useRef(new Audio('./3_min_alert.mp3'))
  const audio1 = useRef(new Audio('./1_min_alert.mp3'))
  const timesUpAudio = useRef(new Audio('./times_up.mp3')) // Final alert sound

  // Initialize audio mute state
  useEffect(() => {
    audio5.current.muted = isMuted
    audio3.current.muted = isMuted
    audio1.current.muted = isMuted
    timesUpAudio.current.muted = isMuted
  }, [isMuted])

  // Preload audio on user interaction
  const preloadAudio = () => {
    audio5.current.load()
    audio3.current.load()
    audio1.current.load()
    timesUpAudio.current.load()
  }

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted)
    audio5.current.muted = !isMuted
    audio3.current.muted = !isMuted
    audio1.current.muted = !isMuted
    timesUpAudio.current.muted = !isMuted
  }

  // Format time into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`
  }

  // Clear all timeouts
  const clearAllTimeouts = () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = null
    }
  }

  // Play audio with user interaction compliance
  const playAudio = (audioRef) => {
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Audio playback failed:', error)
      })
    }
  }

  // Handle checkpoint alerts
  const triggerCheckpoint = (msg, audio) => {
    clearAllTimeouts()
    setShowMessage(true)
    setMessage(msg)
    setBackgroundWhite(true)

    if (!isMuted) {
      playAudio(audio)
    }

    // Reset after 5 seconds
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false)
      setMessage('')
      setBackgroundWhite(false)
    }, 5000)
  }

  // Start or resume timer
  const startTimer = () => {
    preloadAudio() // Preload audio when starting the timer
    setIsRunning(true)
    setIsPaused(false)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev - 1

        if (nextTime === 300) triggerCheckpoint('5 MINUTES REMAINING', audio5)
        if (nextTime === 180) triggerCheckpoint('3 MINUTES REMAINING', audio3)
        if (nextTime === 60) triggerCheckpoint('1 MINUTE REMAINING', audio1)

        if (nextTime <= 0) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          triggerCheckpoint("TIME'S UP!", timesUpAudio) // Final alert
          return 0
        }
        return nextTime
      })
    }, 1000)
  }

  // Pause timer
  const pauseTimer = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
    setIsPaused(true)
  }

  // Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current)
    clearAllTimeouts()
    setTimeLeft(initialTime) // Reset to initial time based on URL
    setIsRunning(false)
    setIsPaused(false)
    setShowMessage(false)
    setBackgroundWhite(false)
    setMessage('')
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full min-h-screen px-4 transition-all duration-500 ${
        backgroundWhite ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      {/* Mute Toggle Button */}
      {!showMessage && (
        <button
          onClick={toggleMute}
          className='absolute transition-all top-6 right-6 hover:scale-110'
        >
          {isMuted ? (
            <FaVolumeMute size={40} className='text-red-600' />
          ) : (
            <FaVolumeUp size={40} className='text-green-600' />
          )}
        </button>
      )}

      {/* Alert Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            key='message'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [1, 1, 1],
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 0px rgba(255,0,0,0)',
                '0 0 20px rgba(255,0,0,0)',
                '0 0 0px rgba(255,0,0,0)',
              ],
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: 2,
              repeat: 5,
              repeatType: 'reverse',
            }}
            className='text-6xl font-extrabold text-center text-red-600 sm:text-8xl'
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer and Controls */}
      {!showMessage && (
        <motion.div
          key='timer-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col items-center'
        >
          <h2 className='mb-8 font-mono text-7xl sm:text-8xl md:text-9xl'>
            {formatTime(timeLeft)}
          </h2>

          {/* Control Buttons */}
          <div className='flex gap-4'>
            {!isRunning && !isPaused && (
              <button
                onClick={startTimer}
                className='p-4 transition bg-green-600 rounded-full hover:bg-green-700'
              >
                <FaPlay size={32} />
              </button>
            )}
            {isRunning && (
              <button
                onClick={pauseTimer}
                className='p-4 transition bg-yellow-500 rounded-full hover:bg-yellow-600'
              >
                <FaPause size={32} />
              </button>
            )}
            {isPaused && (
              <button
                onClick={startTimer}
                className='p-4 transition bg-blue-500 rounded-full hover:bg-blue-600'
              >
                <FaPlayCircle size={32} />
              </button>
            )}
            <button
              onClick={resetTimer}
              className='p-4 transition bg-red-600 rounded-full hover:bg-red-700'
            >
              <FaRedo size={32} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Timer
