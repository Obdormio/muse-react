import { observable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { IMuse } from './schema';

export class MuseRepo {
  @observable
  muse: IMuse;

  constructor(json: string) {
    this.muse = JSON.parse(json);
  }
}

export function useMuseRepo(): MuseRepo {
  return React.useContext(MobXProviderContext).museRepo;
}
