import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { isLoggedInVar,logUserIn } from "../apollo";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($id: String!, $password: String!) {
    login(id: $id, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      id: params?.id,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("id",{
      required:true,
    });
    register("password",{
      required:true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="아이디"
        returnKeyType="next"
        autoCapitalize="none"
        value={watch("id")}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("id", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="비밀번호"
        secureTextEntry
        returnKeyType="done"
        value={watch("password")}
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("id") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}