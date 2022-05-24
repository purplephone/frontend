import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Grid } from "../elements";
import MyProfileBoxBottom from "../components/ProfileBox.bottom";
import MyProfileBoxTop from "../components/ProfileBox.top";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { useNavigate } from "react-router-dom";
import boardAxios from "../axios/boardAxios";
import AlertModal from "../components/AlertModal";
import ConfirmModal from "../components/ConfirmModal";

//유저 프로필(캐릭터, 배경색상, 스티커)를 변경하는 페이지 입니다.
interface Character {
  Character: number;
  color: number;
  stickerOrder: number;
  stickerImageId: number;
  stickers: [];
}
const initChar: Character = {
  Character: 0,
  color: 0,
  stickerOrder: 0,
  stickerImageId: 0,
  stickers: [],
};

const ProfileEdit = ({ type }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 스티커 / 배경색상 탭을 바꾸는 스테이트 입니다.
  const [state, setState] = useState(false);
  // 리덕스에서 사용자의 프로필을 불러옵니다.
  const userChar: Character = useAppSelect((state) => state.char);
  const userInfo = useAppSelect((state) => state.user);
  // 유저의 프로필 정보를 변경하는 스테이트 입니다.
  const [curChar, setCurChar] = useState<Character>(initChar);
  // 유저의 프로필 정보가 변경될때마다, 리덕스의 정보를 업데이트 합니다.
  useEffect(() => {
    setCurChar({ ...initChar, ...userChar });
  }, [userChar]);
  const [getBoard, setBoard] = useState();
  console.log(curChar);

  useEffect(() => {
    const getSticker = async () => {
      await boardAxios.getSticker(userInfo.userId).then((res) => {
        dispatch(setCharacter({ ...res }));
      });
    };
    const getBoard = () => {
      boardAxios.getBoard(userInfo.userId).then((res) => {
        setBoard({ ...res.user });
      });
    };
    getSticker();
    getBoard();
  }, []);

  const saveProfile = () => {
    const data = {
      characterImageId: userChar.Character,
      backgroundColorId: userChar.color,
    };
    boardAxios.setBoard(data);
    window.alert("추가 완료!");
    navigate(`/user/${userInfo.userId}`);
  };
  return (
    <React.Fragment>
      {state ? (
        <Header text="프로필 편집" type="userEdit" />
      ) : (
        <Header
          text="프로필 편집"
          type="userEdit"
          btnName="완료"
          setting={() => saveProfile()}
        />
      )}
      <Grid isFlex>
        <MyProfileBoxTop state={state} sticker={curChar} board={getBoard} />
      </Grid>
      <Grid display="flex" justifyContent="flex-start">
        <div style={{ display: "flex" }}>
          <div
            style={{ margin: "20px", cursor: "pointer" }}
            onClick={() => setState(true)}
          >
            스티커
          </div>
          <div
            style={{ margin: "20px", cursor: "pointer" }}
            onClick={() => setState(false)}
          >
            배경색상
          </div>
        </div>
      </Grid>
      <Grid isFlex>
        <MyProfileBoxBottom setCard={state} />
      </Grid>
    </React.Fragment>
  );
};

export default ProfileEdit;
