import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import useUser from "../useCustom/useUser";
import { useAppSelect } from "../store/config.hook";
import BtnAction from "./MyInfo.BtnAction";
import GridTxt from "./MyInfo.GridTxt";
import {
  characterImageUtils,
  careerUtils,
  yearUtils,
  backgroundColorUtils,
  stickerImageUtils,
} from "../utils/asset";

interface Props {
  bg?: string;
}

const BG = styled.div`
  width: 183px;
  height: 336px;
  border-radius: 20px 0px 0px 20px;
  position: relative;
  right: -53%;
`;

const Line = styled.div`
  border: 2px solid #f5f5f5;
  margin: 38px 0px;
`;

const Position = styled.div``;
const ImgPosition = styled(Position)`
  position: absolute;
  top: 14vh;
  left: 40%;
`;

const CareerGroupDiv = styled.div`
  font-size: 13px;
  margin: 0px 20px;
`;

const CareerItemDiv = styled.div`
  font-size: 13px;
  color: #f24141;
  font-weight: 800;
  margin: 5px 20px;
`;

const NicknameDiv = styled.div`
  margin: 0 54px;
  display: flex;
`;

const Nickname = styled.p`
  margin: auto 10px auto auto;
  font-weight: 800;
`;

const NicknameIs = styled.p`
  margin: auto;
`;

const StickerBG = styled.div`
  position: absolute;
  width: 150px;
  height: 230px;
  top: 79px;
  left: 28px;
`;

const StickerImg = styled.img`
  position: absolute;
  width: 78px;
  height: 78px;
`;

interface Props {
  uid?: string;
  groups: any[];
}

const MyInfo = (props: Props) => {
  const { uid, groups } = props;
  const user = useAppSelect((state) => state.user);
  const navigate = useNavigate();

  //엑시오스로 유저정보를 받아옵니다.
  const {
    careerId,
    yearId,
    nickname,
    point,
    followingUserCount,
    followerUserCount,
    description,
    backgroundColorId,
    characterImageId,
    stickers,
  } = useUser(uid);

  //커리어 정보를 불러옵니다.

  const char = characterImageUtils.findById(characterImageId);
  const career = careerUtils.findById(careerId);
  const years = yearUtils.findById(yearId);
  const bgColor = backgroundColorUtils.findById(backgroundColorId);

  const getSticker = (index: number) => {
    const result = stickers.map((value: any) => {
      return { ...value };
    });
    const mySticker = result.map((value: any) => {
      const image = stickerImageUtils.findById(value.stickerImageId);
      const order = value.stickerOrder;
      return { order, ...image };
    });
    const findSticker = mySticker.find((value) => {
      if (value.order === index) {
        return value;
      }
    });
    return findSticker;
  };
  getSticker(1);
  //팔로우 페이지에 넘어가기전 props로 팔로잉/팔로우, 유저아이디를 전달합니다.
  const goToFollowings = () =>
    navigate("follow", { state: { isfollow: "following", uid: uid } });
  const goToFollowers = () =>
    navigate("follow", { state: { isfollow: "follower", uid: uid } });

  // 내 커리어 정보
  const renderCareerAndNickname = () => {
    return (
      <Position style={{ position: "absolute", top: "1px" }}>
        <Grid display="flex" flexFlow="column wrap">
          <CareerGroupDiv>{description}</CareerGroupDiv>
          <CareerItemDiv>
            {career?.item} {years?.item}
          </CareerItemDiv>
          <NicknameDiv>
            <Nickname>{nickname}</Nickname>
            <NicknameIs>입니다.</NicknameIs>
          </NicknameDiv>
        </Grid>
      </Position>
    );
  };

  // 팔로우, 내정보수정, 개인톡 렌더링
  const renderFollows = () => {
    return (
      <>
        <Grid isFlex customize="margin: 39px 20px 33px 20px;">
          <GridTxt text="참가회수" point={point} />
          <GridTxt
            text="follower"
            point={followerUserCount}
            _onClick={goToFollowers}
          />
          <GridTxt
            text="following"
            point={followingUserCount}
            _onClick={goToFollowings}
          />
          <BtnAction myId={user.userId} yourId={uid} />
        </Grid>
      </>
    );
  };

  // 내 참여 그룹 목록
  const gridProps = { padding: "20px", isFlex: true };

  const goToGroups = (groupId: string) => {
    navigate(`/participate/${groupId}`);
  };
  const renderGroups = () => {
    return groups.map((group: any, key: number) => {
      const isFlex = true;
      const {
        imageUrl,
        title,
        placeName,
        limit,
        join,
        groupId,
        startAt,
        endAt,
      } = group;
      const cardProps = {
        key,
        title,
        limit,
        src: imageUrl,
        address: placeName,
        headcount: join,
        isFlex,
        startAt,
        endAt,
      };
      return <Card {...cardProps} _onClick={() => goToGroups(groupId)} />;
    });
  };

  return (
    <React.Fragment>
      <Grid>
        {/* 프로필 백그라운드 */}
        <BG style={{ background: `${bgColor?.color}` }} />

        <StickerBG>
          <StickerImg
            style={{
              top: "56px",
              left: "1px",
            }}
            src={getSticker(0)?.url}
            alt=""
          />

          <StickerImg
            style={{
              top: "-9px",
              right: "-10px",
            }}
            src={getSticker(1)?.url}
          />
          <StickerImg
            style={{
              top: "124px",
              right: "-10px",
            }}
            src={getSticker(2)?.url}
          />
          <StickerImg
            style={{
              top: "124px",
              left: "-10px",
            }}
            src={getSticker(3)?.url}
          />
        </StickerBG>

        {/* 프로필 이미지 */}
        <ImgPosition>
          <Image shape="rectangle" src={char?.url} size="100px"></Image>
        </ImgPosition>
        {renderCareerAndNickname()}
      </Grid>
      {renderFollows()}
      <Line />
      <Text customize="margin: 0px 0px 23px 20px; font-weight: bold;">
        내가 참가한 파티...
      </Text>
      <Grid {...gridProps}>{renderGroups()}</Grid>
    </React.Fragment>
  );
};

export default MyInfo;
