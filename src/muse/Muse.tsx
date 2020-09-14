import { Provider } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Notation } from './MuseNotation';
import { MuseRepo } from './repo/muse-repo';

const url = 'https://cdn.jsdelivr.net/gh/shizuku/muse-react/test/data/b.json';

async function fetchData() {
  const resp = await fetch(url);
  const body = await resp.text();
  return body;
}

export const Muse: React.FC = () => {
  const [repo, setRepo] = useState<MuseRepo>();

  useEffect(() => {
    fetchData().then(data => {
      const repo = new MuseRepo(data);
      setRepo(repo);
    });
  }, []);

  if (repo === undefined) {
    return <div>Loading</div>;
  }

  return (
    <Provider museRepo={repo}>
      <Notation />
    </Provider>
  );
};
