import styled from "styled-components/native";
import { colors } from "../../colors";

export const TextInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
export const Caption = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content:space-around;
`;
export const CaptionText = styled.Text`
  font-weight: 900;
  font-size: 16px;
  width:25%;
`;
export const CaptionText25 = styled.Text`
  color: ${colors.darkGreen} ;
  font-weight: 900;
  font-size: 16px;
  justify-content:center;
  width: 25%;
`;
export const CaptionText50 = styled.Text`
  color: ${colors.darkGreen} ;
  font-weight: 900;
  font-size: 16px;
  justify-content:center;
  width: 50%;
`;
export const Text25 = styled.Text`
color: ${colors.darkGreen} ;
  font-weight: 800;
  justify-content:center;
  width: 25%;
`;
export const TextG25 = styled.Text`
color: ${colors.darkGreen} ;
  font-weight: 800;
  justify-content:center;
  width: 25%;
`;
export const TextG50 = styled.Text`
color: ${colors.darkGreen} ;
  font-weight: 800;
  justify-content:center;
  width: 50%;
`;
export const TextLightG50 = styled.Text`
color: ${colors.darkGreen} ;
  font-weight: 400;
  justify-content:center;
  width: 50%;
`;
export const ExtraContainer = styled.View`
  padding: 8px;
  width:100%;
`;
export const ChatroomContainer = styled.View`
  flex-direction:row;
  width: 100%;
  justify-content:space-around;
  display:flex;
`;