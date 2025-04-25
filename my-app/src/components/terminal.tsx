import React, { useEffect } from 'react'; // Import React
import { FitAddon } from '@xterm/addon-fit';
import { useXTerm } from 'react-xtermjs';
import 'xterm/css/xterm.css'; // Ensure CSS is imported

// Define props interface
interface TerminalComponentProps {
  stdout?: string[];
  stderr?: string[];
}

const TerminalComponent: React.FC<TerminalComponentProps> = ({ stdout = [], stderr = [] }) => {
  const { instance, ref } = useXTerm();
  // Use React.useRef for the addon to ensure it's stable across renders
  const fitAddon = React.useRef(new FitAddon());

  // Effect for initialization and resizing
  useEffect(() => {
    if (instance && ref.current) {
      // Load the fit addon only once
      instance.loadAddon(fitAddon.current);
      // Fit the terminal initially
      fitAddon.current.fit();

      const handleResize = () => {
        // Ensure fit is called within try-catch as it can throw if terminal is not fully initialized
        try {
          fitAddon.current.fit();
        } catch (e) {
          console.error("Error fitting terminal:", e);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        // Optional: Dispose addon if needed, though usually not necessary unless component unmounts frequently
        // fitAddon.current.dispose();
      };
    }
  }, [instance, ref]); // Depend only on instance and ref for setup

  // Effect for writing stdout and stderr
  useEffect(() => {
    if (instance) {
      // Clear terminal before writing new output
      instance.clear();

      // Write stdout
      stdout.forEach(line => {
        instance.writeln(line);
      });

      // Write stderr (e.g., with a prefix or different color)
      stderr.forEach(line => {
        // Simple prefix:
        if (line) instance.writeln(`stderr: ${line}`);
      });
    }
  }, [instance, stdout, stderr]); // Depend on instance, stdout, and stderr

  // Render the div that react-xtermjs will use
  return <div ref={ref} style={{ height: '300px', width: '100%' }} />; // Ensure height is set
};

export default TerminalComponent;