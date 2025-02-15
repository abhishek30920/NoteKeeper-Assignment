// useSocket.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/auth';
import { useAuth } from './useAuth';
import { SOCKET_URL } from '../lib/constants';

export const useSocket = () => {
  const socketRef = useRef(null);
  const { user } = useAuth();
  const token = useAuthStore.getState().token;
  const [isConnected, setIsConnected] = useState(false);
  const eventHandlersRef = useRef(new Map()); // Keep track of registered handlers

  // Create a stable reference for event registration
  const registerHandler = useCallback((event, handler) => {
    if (socketRef.current) {
      // Remove existing handler if it exists
      if (eventHandlersRef.current.has(event)) {
        socketRef.current.off(event, eventHandlersRef.current.get(event));
      }
      // Register new handler
      socketRef.current.on(event, handler);
      eventHandlersRef.current.set(event, handler);
    }
  }, []);

  // Clean up function to remove all event listeners
  const cleanupEventListeners = useCallback(() => {
    if (socketRef.current) {
      eventHandlersRef.current.forEach((handler, event) => {
        socketRef.current.off(event, handler);
      });
      eventHandlersRef.current.clear();
    }
  }, []);

  useEffect(() => {
    // Only initialize socket if we have both user and token
    if (!socketRef.current && user && token) {
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000
      });

      // Set up core event handlers
      const setupCoreHandlers = () => {
        registerHandler('connect', () => {
          console.log('Socket connected successfully');
          setIsConnected(true);
          socketRef.current.emit('join', user.id);
        });

        registerHandler('connect_error', (error) => {
          console.error('Socket connection error:', error);
          setIsConnected(false);
        });

        registerHandler('disconnect', () => {
          console.log('Socket disconnected');
          setIsConnected(false);
        });

        registerHandler('reconnect', () => {
          console.log('Socket reconnected');
          setIsConnected(true);
          socketRef.current.emit('join', user.id);
        });
      };

      setupCoreHandlers();
    }

    // Cleanup function
    return () => {
      cleanupEventListeners();
      if (socketRef.current) {
        console.log('Cleaning up socket connection');
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [user, token, registerHandler, cleanupEventListeners]);

  return {
    socket: socketRef.current,
    isConnected,
    registerHandler,
    cleanupHandler: (event) => {
      if (socketRef.current && eventHandlersRef.current.has(event)) {
        socketRef.current.off(event, eventHandlersRef.current.get(event));
        eventHandlersRef.current.delete(event);
      }
    }
  };
};