import * as React from 'react';
import { getSentences } from './services';
import { List } from './components';
import styles from './App.style.scss';

export interface MainAppProps {
  appName: string;
}

export const App = (props: MainAppProps) => {
  const [sentenceData, setSentenceData] = React.useState([]);
  const searchTextRef = React.useRef(null);

  const fetchSentences = async (searchValue: string, languageTarget: string) => {
    const result = await getSentences({ searchValue, languageTarget });
    console.log('result', result);
    setSentenceData(result.data as any);
  };

  React.useEffect(() => {
    fetchSentences('kĩ năng', 'vi');
  }, []);

  async function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      await fetchSentences(searchTextRef?.current?.value, 'vi');
    }
  }

  return (
    <div className={styles.container}>
      <h1>{props.appName}</h1>
      <div className={styles.centerFlex}>
        <input ref={searchTextRef} onKeyDown={handleKeyDown} className={styles.input} placeholder="Search..."></input>
      </div>
      <List data={sentenceData as any} />
    </div>
  );
};
