export interface IMuse {
  title: string;
  subtitle: string;
  author: string;
  rhythmic: string;
  C: string;
  pages: IPage[];
}

export interface IPage {
  lines: ILine[];
}

export interface ILine {
  tracks: ITrack[];
}

export interface ITrack {
  bars: IBar[];
}

export interface IBar {
  notes: INotes[];
}

export interface INotes {
  n: string;
  l: string;
  p: string;
}
