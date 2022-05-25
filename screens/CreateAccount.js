import React, {useRef} from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";


export default function CreateAccount() {
  const nameRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
  };
  return (
    <AuthLayout>
      <TextInput
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(nameRef)}
      />
      <TextInput
        ref={nameRef}
        placeholder="이름"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <AuthButton text="회원가입" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}