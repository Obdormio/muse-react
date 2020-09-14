import React from 'react';
import { useMuseRepo } from './repo/muse-repo';
import { useObserver } from 'mobx-react';
import { MusePages } from './MusePage';

const NotationInfo: React.FC = () => {
  const repo = useMuseRepo();
  const [title, subtitle, author, C, rhythmic] = useObserver(() => {
    const muse = repo.muse;
    return [muse.title, muse.subtitle, muse.author, muse.C, muse.rhythmic];
  });

  const authors = author.split('|').map(it => (
    <div
      key={it}
      style={{ textAlign: 'right', fontSize: '20px', fontFamily: 'serif' }}>
      {it}
    </div>
  ));

  const rhythmicText = `1=${C} ${rhythmic}`;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{ margin: '70px 0 0', fontSize: '34px', fontFamily: 'serif' }}>
        {title}
      </div>
      <div
        style={{ margin: '10px 0 0', fontSize: '22px', fontFamily: 'serif' }}>
        {subtitle}
      </div>
      <div>{authors}</div>
      <div
        style={{
          position: 'absolute',
          fontSize: '20px',
          fontFamily: 'serif',
          left: '0',
          bottom: '0',
        }}>
        {rhythmicText}
      </div>
    </div>
  );
};

export const Notation: React.FC = () => {
  return (
    <div
      style={{
        border: 'solid thin grey',
        padding: '0 100px',
        width: '1000px',
        margin: '10px auto',
        boxSizing: 'border-box',
      }}>
      <NotationInfo />
      <MusePages />
    </div>
  );
};
