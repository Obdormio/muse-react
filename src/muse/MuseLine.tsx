import React from 'react';
import Dimens from './Dimens';
import MuseConfig from './MuseConfig';
import MuseTrack, { Track } from './MuseTrack';
import { border } from './Border';
import { ILine } from './repo/schema';

export class Line {
  config: MuseConfig;
  tracks: Track[] = [];
  dimens: Dimens = new Dimens();
  constructor(o: any, config: MuseConfig) {
    this.config = config;
    if (o.tracks !== undefined) {
      o.tracks.forEach((it: any) => {
        this.tracks.push(new Track(it, this.config));
      });
    }
    if (o.dimens !== undefined) {
      this.dimens = o.dimens;
    }
  }
}

function lineHead(d: Dimens, clazz: string) {
  return (
    <g className={clazz + '__line-head'}>
      <line x1={0} y1={0} x2={0} y2={d.height} strokeWidth={1} stroke="black" />
    </g>
  );
}

function MuseLine2(props: { line: Line }) {
  let d = props.line.dimens;
  let clazz = 'muse-line';
  return (
    <g
      className={clazz}
      transform={
        'translate(' + (d.x - d.marginLeft) + ',' + (d.y - d.marginTop) + ')'
      }
      width={d.width + d.marginLeft + d.marginRight}
      height={d.height + d.marginTop + d.marginBottom}>
      {border(d, clazz)}
      {lineHead(d, clazz)}
      {props.line.tracks.map((it, idx) => (
        <MuseTrack track={it} key={idx} />
      ))}
    </g>
  );
}

export default MuseLine2;

export interface IMuseLinesProps {
  lines: ILine[];
}

export const MuseLines: React.FC<IMuseLinesProps> = ({ lines }) => {
  return <div></div>;
};
