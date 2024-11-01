import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { Volume2, VolumeX, X, AlertCircle } from 'lucide-react';
import { Game, WindowPosition } from '../types';
import LiveStream from './LiveStream';
import 'react-resizable/css/styles.css';

interface GameWindowProps {
  game: Game;
  position: WindowPosition;
  onPositionChange: (position: Partial<WindowPosition>) => void;
  onFocus: () => void;
  onRemove: () => void;
}

const GameWindow: React.FC<GameWindowProps> = ({
  game,
  position,
  onPositionChange,
  onFocus,
  onRemove
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [streamError, setStreamError] = useState<string | null>(null);
  const dragRef = useRef(null);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    onPositionChange({ x: data.x, y: data.y });
  };

  const handleResize = (_e: any, { size }: { size: { width: number; height: number } }) => {
    onPositionChange({ width: size.width, height: size.height });
  };

  const handleStreamError = (error: Error) => {
    setStreamError(error.message);
  };

  return (
    <Draggable
      nodeRef={dragRef}
      handle=".window-header"
      position={{ x: position.x, y: position.y }}
      onDrag={handleDrag}
      onStart={onFocus}
      bounds="parent"
    >
      <div
        ref={dragRef}
        className="absolute bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
        style={{ zIndex: position.zIndex, width: position.width, height: position.height }}
      >
        <ResizableBox
          width={position.width}
          height={position.height}
          onResize={handleResize}
          minConstraints={[320, 240]}
          maxConstraints={[800, 600]}
          resizeHandles={['se']}
          handle={<div className="react-resizable-handle react-resizable-handle-se" />}
        >
          <div style={{ width: '100%', height: '100%' }}>
            {/* Window Header */}
            <div className="window-header bg-gray-700 p-2 cursor-move flex items-center justify-between select-none">
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold">{game.title}</span>
                <span className="text-red-500 text-sm font-semibold flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <button
                onClick={onRemove}
                className="p-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stream Content */}
            <div className="relative" style={{ height: 'calc(100% - 40px)' }}>
              {streamError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-red-500">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{streamError}</span>
                  </div>
                </div>
              ) : (
                <LiveStream
                  url={game.streamUrl}
                  isMuted={isMuted}
                  onError={handleStreamError}
                />
              )}

              {/* Stream Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-gray-300">{game.league}</span>
                    <span className="text-gray-300">{game.minute}</span>
                    <span className="text-white font-semibold">{game.score}</span>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default GameWindow;