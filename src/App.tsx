import { Suspense, useEffect, useRef } from 'react';
import { createRoot } from '@react-three/fiber'
import styled from 'styled-components';
import { useLayout } from 'Stores/layout';
import { Title, About, Commercial } from 'Components/sections/index';
import { ScrollHandler } from 'Components/scroll/ScrollHandler';
import 'r3f-namespace';

const AppContainer = styled('div')`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const CanvasRoot = styled('canvas')`
  position: fixed;
`

/**
 * The base app component that is rendered by react.
 *
 * As a single page application this is where all screens should go, alongside any global state handlers such as layout and their respective default params.
 * @category Component
 */
function App() {
  const canvasRootRef = useRef<HTMLCanvasElement>(null);

  // set margins
  useLayout.setState({ marginX: 0.1, marginY: 0.05 });

  // add resize event listener
  useEffect(() => {
    window.addEventListener('resize', () => {
      // create r3f canvas
      if (canvasRootRef.current) {
        createRoot(canvasRootRef.current, {
          orthographic: true,
          camera: { position: [0, 0, 10000], far: 20000 },
          dpr: [1, 1],
          linear: true,
          flat: true
        }).render(
          <group>
            <Title index={0} parallax={1} />
            <About index={1} parallax={1.5} />
            <Commercial index={2} parallax={1} alternateColor alternatePosition />
          </group> 
        )
      }
        
      // determine if vertical layout
      useLayout.setState({ isVertical: window.innerHeight > window.innerWidth });

      
    });      

    // fire resize event for initial sizing
    window.dispatchEvent(new Event('resize'));
  }, []);

  const sectionNames = ['', 'about me', 'commercial', 'portfolio', 'research', 'euphony', 'music', ''];

  return (
    <AppContainer>
      <Suspense fallback={null}>
        <CanvasRoot ref={canvasRootRef} />
      </Suspense>

      <ScrollHandler numSections={sectionNames.length} sectionNames={sectionNames} />
    </AppContainer>
  );
}

export { App };
