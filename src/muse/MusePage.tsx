import React from 'react';
import MuseConfig from './MuseConfig';
import Dimens from './Dimens';
import MuseLine2, { Line, MuseLines } from './MuseLine';
import { border, outerBorder } from './Border';
import { IPage } from './repo/schema';
import { useMuseRepo } from './repo/muse-repo';
import { useObserver } from 'mobx-react';

export class Page2 {
  config: MuseConfig;
  lines: Line[] = [];
  dimens: Dimens = new Dimens();
  index: number = 0;
  constructor(o: any, config: MuseConfig) {
    this.config = config;
    if (o.lines !== undefined) {
      o.lines.forEach((it: any) => {
        this.lines.push(new Line(it, this.config));
      });
    }
    if (o.dimens !== undefined) {
      this.dimens = o.dimens;
    }
  }
}

function pageIndex(idx: number, d: Dimens, clazz: string, config: MuseConfig) {
  return (
    <g
      className={clazz + '__page-index'}
      transform={
        'translate(' +
        (d.marginLeft + d.width / 2) +
        ',' +
        (d.marginTop + d.height + d.marginBottom / 2) +
        ')'
      }>
      <text
        textAnchor={'middle'}
        fontFamily={config.textFontFamily}
        fontSize={config.pageIndexFontSize}>
        {idx.toString()}
      </text>
    </g>
  );
}

function MusePage2(props: { page: Page2 }) {
  let d = props.page.dimens;
  let clazz = 'muse-page';
  return (
    <g
      className={clazz}
      transform={
        'translate(' + (d.x - d.marginLeft) + ',' + (d.y - d.marginTop) + ')'
      }
      width={d.width + d.marginLeft + d.marginRight}
      height={d.height + d.marginTop + d.marginBottom}>
      {border(d, clazz)}
      {outerBorder(d, clazz)}
      {pageIndex(props.page.index, d, clazz, props.page.config)}
      {props.page.lines.map((it, idx) => (
        <MuseLine2 line={it} key={idx} />
      ))}
    </g>
  );
}

export default MusePage2;

interface IPageProps {
  page: IPage;
  idx: number;
}

const Page: React.FC<IPageProps> = ({ page }) => {
  const lines = useObserver(() => page.lines);

  return (
    <div>
      <MuseLines lines={lines} />
    </div>
  );
};

export const MusePages: React.FC = () => {
  const repo = useMuseRepo();

  const [pages] = useObserver(() => {
    const muse = repo.muse;
    return [muse.pages];
  });

  return (
    <div>
      {pages.map((page, idx) => (
        <Page page={page} key={idx} idx={idx} />
      ))}
    </div>
  );
};
