import * as React from 'react';
import styles from './index.scss';
import ReactHtmlParser from 'react-html-parser';

export interface IListItem {
  _id?: string;
  fields: { en: string; vi: string };
}
export interface IListProps {
  data: { sentences: [IListItem] };
}

export default function ({ data, className: classNameProp }: IListProps & React.HTMLAttributes<HTMLDataListElement>) {
  if ((data.sentences.length as any) === 0) {
    return <div className={`${styles.list} ${styles.notFound} ${classNameProp}`}>Không tim thấy câu nào</div>;
  }
  return (
    <div className={`${styles.list} ${classNameProp}`}>
      {data?.sentences?.map((item) => {
        return (
          <div key={item._id} className={styles.item}>
            <span className={styles.foundLanguage}>{ReactHtmlParser(item.fields.en)}</span>
            <span className={styles.targetLanguage}>{ReactHtmlParser(item.fields.vi)}</span>
          </div>
        );
      })}
    </div>
  );
}
