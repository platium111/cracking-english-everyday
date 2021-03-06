import * as React from 'react';
import { getSentences } from './services';
import { Button, Textfield, Select, Frame } from './components';
import styles from './App.style.scss';
import './App.style.scss';

import globalStyles from './_foundation/styles/globalSpaces.scss';
import { APP_CONSTANTS, useExchangeMessage } from './_foundation';
import Loader from 'react-loader-spinner';
import { createSkeleton, ListSkeleton } from './placeholders';
const ListLazy = React.lazy(() => import('./components/list'));

export interface MainAppProps {
  appName: string;
  appType?: string;
}

const DEFAULT_SEARCH_WORD = 'kĩ năng';
const DEFAULT_TARGET_LANGUAGE = 'vi';
const DEFAUTL_LANGUAGE_OPTIONS = [
  { label: 'Vietnamese', value: 'vi' },
  { label: 'English', value: 'en' },
];

const EnhanceListSkeleton = createSkeleton(ListSkeleton, {});

export const App = (props: MainAppProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { className: classNameProps, appType } = props;
  const [sentenceData, setSentenceData] = React.useState([]);
  const searchTextRef = React.useRef(null);
  const [targetLanguage, setTargetLanguage] = React.useState(DEFAULT_TARGET_LANGUAGE);
  const { data: dataExchangeMessage } = useExchangeMessage(DEFAULT_SEARCH_WORD);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  const fetchSentences = async (searchValue: string, languageTarget: string) => {
    setLoading(true);
    try {
      const result = await getSentences({ searchValue, languageTarget });
      setSentenceData(result.data as any);
      setLoading(false);
    } catch (ex) {
      setError(ex);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSentences(DEFAULT_SEARCH_WORD, DEFAULT_TARGET_LANGUAGE);
  }, []);

  React.useEffect(() => {
    const run = async () => {
      searchTextRef.current.value = dataExchangeMessage || '';
      await fetchSentences(dataExchangeMessage as string, targetLanguage);
    };

    if (dataExchangeMessage && searchTextRef?.current) {
      run();
    }
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

  if (error) return <div>Internet connect failed or API failed</div>;

  // ! className is not working with iframe
  return (
    <Frame appType={appType}>
      <div
        className={`${styles.container} ${styles.scrollbar} ${
          appType === APP_CONSTANTS.appType.chrome && styles.globalFont
        } ${classNameProps}`}
      >
        {appType !== APP_CONSTANTS.appType.chrome && (
          <h1 className={appType === APP_CONSTANTS.appType.chrome && styles.h1Extension}>{props.appName}</h1>
        )}
        <div className={styles.centerFlex}>
          <Textfield
            ref={searchTextRef}
            onKeyDown={handleKeyDown}
            className={styles.input}
            placeholder="Search..."
          ></Textfield>
          <Select
            onChange={handleSelect}
            className={`${globalStyles.componentSpace}`}
            data={DEFAUTL_LANGUAGE_OPTIONS}
          ></Select>
          <Button className={globalStyles.componentSpace} onClick={handleClick} label="Tra từ" id="traTuBtn"></Button>
        </div>
        {appType === APP_CONSTANTS.appType.chrome && (
          <div className={`${styles.inforText} ${globalStyles.verticalSpace}`}>! Nhấn ESC để đóng tra từ</div>
        )}
        <div className={styles.centerFlex}>
          {loading ? (
            <EnhanceListSkeleton />
          ) : (
            <>
              <React.Suspense fallback={<Loader type="Oval" color="#00BFFF" height={48} width={48} />}>
                <ListLazy
                  data={sentenceData as any}
                  className={appType === APP_CONSTANTS.appType.chrome && styles.listOverriding}
                />
              </React.Suspense>
            </>
          )}
        </div>
        <div id="footer" className={styles.footer}>
          <img
            src={appType === APP_CONSTANTS.appType.chrome ? chrome.runtime.getURL('images/banner.png') : 'images/banner.png'}
            alt="Ảnh banner bị lỗi"
          />
          <span className={`${globalStyles.componentSpace}`}>Developed by Clark</span>
        </div>
      </div>
    </Frame>
  );
};
