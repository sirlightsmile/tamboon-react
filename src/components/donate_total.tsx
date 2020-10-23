import React from 'react';
import { atom, selector, useRecoilValue } from 'recoil';
import { Currency } from '../model/enum';

const donateTotalAtom = atom<number>({
  key: 'donateTotal',
  default: 0,
});

export const donateTotalState = selector<number>({
  key: 'donateTotalState',
  get: ({ get }) => {
    return get(donateTotalAtom);
  },
  set: ({ get, set }, newValue) => {
    const currentValue = get(donateTotalAtom);
    const addedValue = newValue as number;
    set(donateTotalAtom, currentValue + addedValue);
  },
});

function DonateTotal(props: { currency: Currency }) {
  const total = useRecoilValue(donateTotalAtom);
  return (
    <h2>
      All donations: {total.toLocaleString()} {props.currency}
    </h2>
  );
}

export default DonateTotal;
