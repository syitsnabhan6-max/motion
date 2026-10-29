import React from 'react';
import {Composition} from 'remotion';
import {ArcherFilm} from './archer/ArcherFilm';
import {Film} from './Film';
import {PulseFilm} from './pulse/PulseFilm';
import {settings} from './content';
export const Root: React.FC = () => <><Composition id="Archer" component={ArcherFilm} width={1800} height={600} fps={60} durationInFrames={2040}/><Composition id="SunkCost" component={Film} width={settings.width} height={settings.height} fps={settings.fps} durationInFrames={Math.round(settings.duration*settings.fps)}/><Composition id="Pulse" component={PulseFilm} width={1080} height={1920} fps={60} durationInFrames={1440}/></>;
