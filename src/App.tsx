import * as React from 'react';
import { getSentences } from './services';
import { List, Button, Textfield, Select } from './components';
import styles from './App.style.scss';
import globalStyles from './_foundation/styles/globalSpaces.scss';
import { useExchangeMessage } from './_foundation';
// import Frame, { FrameContextConsumer } from 'react-frame-component';

export interface MainAppProps {
  appName: string;
  appType?: string;
}

export const App = (props: MainAppProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { className: classNameProps, appType = 'web' } = props;
  const [sentenceData, setSentenceData] = React.useState([]);
  const searchTextRef = React.useRef(null);
  const [targetLanguage, setTargetLanguage] = React.useState('vi');
  const { data: dataExchangeMessage } = useExchangeMessage('kĩ năng');

  const fetchSentences = async (searchValue: string, languageTarget: string) => {
    const result = await getSentences({ searchValue, languageTarget });
    console.log('result', result);
    setSentenceData(result.data as any);
  };

  React.useEffect(() => {
    fetchSentences('kĩ năng', 'vi');
  }, []);

  React.useEffect(() => {
    const run = async () => {
      searchTextRef.current.value = dataExchangeMessage;
      await fetchSentences(dataExchangeMessage as string, targetLanguage);
    };
    run();
  }, [dataExchangeMessage]);

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
    <div className={`${styles.container} ${classNameProps}`}>
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
