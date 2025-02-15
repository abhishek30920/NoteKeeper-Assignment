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
      if (eventHandlersRef.current.has(event)) {
        socketRef.current.off(event, eventHandlersRef.current.get(event));
      }
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
    if (!socketRef.current && user && token) {
      console.log('Connecting to Socket.IO server:', SOCKET_URL);

      socketRef.current = io(SOCKET_URL, {
        auth: { token },
        transports: ["polling"],
        withCredentials: true, // Allow sending credentials
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        timeout: 15000
      });

      const setupCoreHandlers = () => {
        registerHandler('connect', () => {
          console.log('✅ Socket connected');
          setIsConnected(true);
          socketRef.current.emit('join', user.id);
        });

        registerHandler('connect_error', (error) => {
          console.error('❌ Socket connection error:', error.message);
          setIsConnected(false);
        });

        registerHandler('disconnect', () => {
          console.warn('⚠️ Socket disconnected');
          setIsConnected(false);
        });

        registerHandler('reconnect', () => {
          console.log('🔄 Socket reconnected');
          setIsConnected(true);
          socketRef.current.emit('join', user.id);
        });
      };

      setupCoreHandlers();
    }

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
