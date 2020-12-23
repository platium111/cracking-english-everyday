import * as React from 'react';
import { getSentences } from './services';
import { List, Button, Textfield, Select } from './components';
import styles from './App.style.scss';
import globalStyles from './_foundation/globalSpaces.scss';

export interface MainAppProps {
  appName: string;
}

export const App = (props: MainAppProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [sentenceData, setSentenceData] = React.useState([]);
  const searchTextRef = React.useRef(null);
  const [targetLanguage, setTargetLanguage] = React.useState('vi');

  const fetchSentences = async (searchValue: string, languageTarget: string) => {
    const result = await getSentences({ searchValue, languageTarget });
    console.log('result', result);
    setSentenceData(result.data as any);
  };

  React.useEffect(() => {
    fetchSentences('kĩ năng', 'vi');
  }, []);

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const searchText = searchTextRef?.current?.value;
      if (searchText) {
        await fetchSentences(searchTextRef?.current?.value, targetLanguage);
      }
    }
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setTargetLanguage(e.target.value);
  }

  async function handleClick() {
    const searchText = searchTextRef?.current?.value;
    if (searchText) {
      await fetchSentences(searchTextRef?.current?.value, targetLanguage);
    }
  }

  return (
    <div className={styles.container}>
      <h1>{props.appName}</h1>
      <div className={styles.centerFlex}>
        <Textfield
          ref={searchTextRef}
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder="Search..."
        ></Textfield>
        <Select
          onChange={handleSelect}
          className={globalStyles.componentSpace}
          data={[
            { label: 'Vietnamese', value: 'vi' },
            { label: 'English', value: 'en' },
          ]}
        ></Select>
        <Button className={globalStyles.componentSpace} onClick={handleClick} label="Tra từ" id="traTuBtn"></Button>
      </div>
      <div className={styles.centerFlex}>
        <List data={sentenceData as any} />
      </div>
    </div>
  );
};
