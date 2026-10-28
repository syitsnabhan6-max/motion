import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';
Config.setVideoImageFormat('jpeg');
Config.setConcurrency(2);
if(process.env.CHROME_PATH) Config.setBrowserExecutable(process.env.CHROME_PATH);
else if(existsSync('/usr/bin/chromium')) Config.setBrowserExecutable('/usr/bin/chromium');
