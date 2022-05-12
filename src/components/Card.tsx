import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  address1: string;
  startAt?: Date;
  endAt?: Date;
  isFlex?: boolean;
  limit: Number;
  headcount: Number;
  _onClick?(): void;
  src?: string;
};

const Card = ({
  title,
  address1,
  startAt,
  endAt,
  isFlex,
  limit,
  headcount,
  _onClick,
  src,
}: Props) => {
  const able = limit === headcount;
  if (isFlex) {
    return (
      <React.Fragment>
        <BackgroundImage isFlex onClick={_onClick} src={src}>
          <Abled able={able} />
          <PartyInfo isFlex>
            <div>{title}</div>
            <div>{address1}</div>
            {startAt} ~ {endAt}
          </PartyInfo>
          <PartyHeadcount>
            {headcount} / {limit}
          </PartyHeadcount>
        </BackgroundImage>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BackgroundImage onClick={_onClick}>
        <PartyInfo>
          <div>{title}</div>
          <div>{address1}</div>
          {startAt} ~ {endAt}
        </PartyInfo>
      </BackgroundImage>
    </React.Fragment>
  );
};

interface BackgroundImageProps {
  isFlex?: boolean;
  src?: string;
}

interface PartyHeadcountProps {
  children?: any;
}

interface PartyInfoProps {
  children?: any;
  isFlex?: boolean;
}

interface AbledProps {
  able: boolean;
}

const Abled = styled.div<AbledProps>`
  width: 33px;
  height: 33px;
  background: ${(props) => (props.able ? "gray" : "green")};
  top: -7px;
  left: -7px;
  border-radius: 33px;
  position: inherit;
`;

const BackgroundImage = styled.div<BackgroundImageProps>`
  position: relative;

  border-radius: 15px;
  width: ${(props) => (props.isFlex ? "48%" : "100%")};
  height: ${(props) => (props.isFlex ? "222px" : "130px")};
  background-image: ${(props) =>
    props.src
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgb(0, 0, 0) 100%), url("${props.src}");`
      : `linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%), url("${props.src}");`};
  /* background: ${(props) =>
    props.isFlex
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)"
      : "linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%)"}; */
  color: white;
  margin-bottom: 10px;
`;

const PartyInfo = styled.div<PartyInfoProps>`
  position: inherit;
  top: ${(props) => (props.isFlex ? "100px" : "50px")};
`;
const PartyHeadcount = styled.div<PartyHeadcountProps>`
  position: absolute;
  width: 50px;
  height: 28px;
  border-radius: 10px;
  padding: 3px 4px;
  background: #424242;
  right: 10px;
  top: 10px;
  text-align: center;
`;
export default Card;
