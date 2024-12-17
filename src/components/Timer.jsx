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
  // State management
  const [timeLeft, setTimeLeft] = useState(8 * 60) // Initial time in seconds
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

  // Initialize mute state when component mounts
  useEffect(() => {
    audio5.current.muted = isMuted
    audio3.current.muted = isMuted
    audio1.current.muted = isMuted
  }, [isMuted])

  // Toggle audio mute state
  const toggleMute = () => {
    setIsMuted(!isMuted)
    audio5.current.muted = !isMuted
    audio3.current.muted = !isMuted
    audio1.current.muted = !isMuted
  }

  // Format seconds into MM:SS display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`
  }

  // Clear any existing timeouts
  const clearAllTimeouts = () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = null
    }
  }

  // Handle checkpoint alerts (5min, 3min, 1min)
  const triggerCheckpoint = (msg, audio) => {
    clearAllTimeouts()

    setShowMessage(true)
    setMessage(msg)
    setBackgroundWhite(true)

    // Play audio if not muted
    if (!isMuted) {
      try {
        audio.current.play()
      } catch (error) {
        console.warn('Audio playback failed:', error)
      }
    }

    // Reset states after 5seconds
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage(false)
      setMessage('')
      setBackgroundWhite(false)
    }, 5000)
  }

  // Start/resume timer
  const startTimer = () => {
    setIsRunning(true)
    setIsPaused(false)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev - 1

        // Check for alert points
        if (nextTime === 300) triggerCheckpoint('5 MINUTES REMAINING', audio5)
        if (nextTime === 180) triggerCheckpoint('3 MINUTES REMAINING', audio3)
        if (nextTime === 60) triggerCheckpoint('1 MINUTE REMAINING', audio1)

        // Handle timer completion
        if (nextTime <= 0) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          triggerCheckpoint("TIME'S UP!", audio1)
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

  // Reset timer to initial state
  const resetTimer = () => {
    clearInterval(timerRef.current)
    clearAllTimeouts()
    setTimeLeft(8 * 60)
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
      {/* Simple speaker icon toggle - only visible when not showing alert */}
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

      {/* Main content with animations */}
      <AnimatePresence mode='wait'>
        {showMessage ? (
          // Alert message animation
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
        ) : (
          // Timer display and controls
          <motion.div
            key='timer-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center'
          >
            {/* Timer display */}
            <h2 className='mb-8 font-mono text-7xl sm:text-8xl md:text-9xl'>
              {formatTime(timeLeft)}
            </h2>

            {/* Control buttons */}
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
      </AnimatePresence>
    </div>
  )
}

export default Timer
