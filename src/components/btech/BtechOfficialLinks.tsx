import React from 'react';
import { OfficialLinksCard } from '../OfficialLinksCard';

interface Props {
  info: any;
}

export const BtechOfficialLinks: React.FC<Props> = ({ info }) => {
  return (
    <OfficialLinksCard
      categoryName="B.Tech Engineering"
      links={info.officialLinks}
    />
  );
};