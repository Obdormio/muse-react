import React from "react";
import Dimens from "./Dimens";
import MuseBar, { Bar } from "./MuseBar";
import { border } from "./untils";

export class Track {
  bars: Bar[] = [];
  dimens: Dimens = new Dimens();
  constructor(json: string) {
    let o = JSON.parse(json);
    if (o.bars !== undefined) {
      o.bars.forEach((it: any) => {
        this.bars.push(new Bar(JSON.stringify(it)));
      });
    }
    if (o.dimens !== undefined) {
      this.dimens = o.dimens;
    }
  }
}

function MuseTrack(props: { track: Track }) {
  let d = props.track.dimens;
  let clazz = "muse-track";
  return (
    <g
      className={clazz}
      transform={
        "translate(" + (d.x - d.marginLeft) + "," + (d.y - d.marginTop) + ")"
      }
      width={d.width + d.marginLeft + d.marginRight}
      height={d.height + d.marginTop + d.marginBottom}
    >
      {border(d, clazz)}
      {props.track.bars.map((it, idx) => (
        <MuseBar bar={it} key={idx} />
      ))}
    </g>
  );
}

export default MuseTrack;