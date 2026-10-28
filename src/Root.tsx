import React from 'react';
import {Composition} from 'remotion';
import {Film} from './Film';
import {settings} from './content';
export const Root: React.FC = () => <Composition id="SunkCost" component={Film} width={settings.width} height={settings.height} fps={settings.fps} durationInFrames={Math.round(settings.duration*settings.fps)}/>;
