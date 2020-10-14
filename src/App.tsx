import * as React from 'react';
import { getSentences } from './services';
import { List } from './components';
export interface MainAppProps {
  appName: string;
}

export const App = (props: MainAppProps) => {
  const [sentenceData, setSentenceData] = React.useState([]);
  React.useEffect(() => {
    const fetchSentences = async () => {
      const result = await getSentences({ searchValue: 'chuẩn mực', languageTarget: 'vi' });
      console.log('result', result);
      setSentenceData(result.data as any);
    };

    fetchSentences();
  }, []);

  return (
    <div>
      <h1>{props.appName}</h1>
      <List data={sentenceData as any} />
    </div>
  );
};
