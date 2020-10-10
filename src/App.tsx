import * as React from 'react';

export interface MainAppProps {
  appName: string;
}

export const App = (props: MainAppProps) => <h1>{props.appName}</h1>;
