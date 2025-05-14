/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled from 'styled-components';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number[];
  onChange: (values: number[]) => void;
}

export default function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  return (
    <Wrapper>
      <Range
        values={value}
        step={10}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <Track {...props}>
            {children}
          </Track>
        )}
        renderThumb={({ props }) => (
          <Thumb {...props} />
        )}
      />
      <Values>
        <Value>${value[0]}</Value>
        <Value>${value[1]}</Value>
      </Values>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem 0;
`;

const Track = styled.div`
  height: 0.4rem;
  width: 100%;
  background: rgba(115, 10, 168, 0.2);
  border-radius: 0.4rem;
`;

const Thumb = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgb(115, 10, 168);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Values = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Value = styled.span`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.8);
`;