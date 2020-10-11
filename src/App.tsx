import * as React from 'react';
import {getSentences} from './services'

export interface MainAppProps {
  appName: string;
}

export const App = (props: MainAppProps) => {
  React.useEffect(() => {
    const fetchSentences = async () => {
      await getSentences({searchValue: 'lan', languageTarget: "en"})
    }

    fetchSentences();
  }, []);

  return <h1>{props.appName}</h1>; }
