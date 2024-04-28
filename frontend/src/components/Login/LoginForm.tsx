"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  section_btn,
  input_class,
  label_class,
  form_title,
} from "@/styles/tailwind_classes";
import CustomLink from "../General/CustomLink";
import OptimizedImage from "../General/OptimizedImage";
import { useRouter } from "next/navigation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serialize } from "object-to-formdata";
import Loading from "../General/Loading";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
} from "../ui/form";
import Message from "../General/Message";

const LoginFormSchema = z.object({
  username: z.string().min(1, "O usuário é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type FormData = z.infer<typeof LoginFormSchema>;

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aureus.procc.fiocruz.br/sgbmi/admin/users/",
    mode: "no-cors",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ estado: string; mensaje: string }, FormData>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

const { useLoginMutation } = authApi;

const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (loginData: FormData) => {
    const parsedLoginData = {
      usuario: loginData.username,
      senha: loginData.password,
    };
    const formData = serialize(parsedLoginData);
    try {
      const response = await login(formData).unwrap();
      const cookie = Headers.get("set-cookie");
      console.log(cookie);
      if (response.estado === "Ok") {
        form.reset();
        // Aquí puedes obtener la cookie de la respuesta
        const cookie = response.headers.get("set-cookie");
        // Y guardarla en el navegador
        document.cookie = cookie;
        console.log(document.cookie);
        router.replace("https://aureus.procc.fiocruz.br/sgbmi/");
        console.log("Login successful");
      } else {
        console.log("Login error: ", response.mensaje);
      }
    } catch (err) {
      console.log("An error occurred: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess && !error) {
      form.reset();
      router.replace("https://aureus.procc.fiocruz.br/sgbmi/");
    }
  }, [isSuccess, error, form, router]);

  return (
    <div className="mx-5 py-10 px-5 2xl:w-[35%] lg:w-[40%] md:w-[65%] bg-slate-200 rounded-lg">
      <div className="flex flex-col justify-center items-center py-6 sm:px-8 px-2">
        <div className="flex flex-row justify-center items-center">
          <OptimizedImage
            src="/Home/signature_cabgen_dark.png"
            alt="Cabgen logo"
            className="object-cover sm:w-6/12 w-2/3 mb-5"
          />
        </div>
        <Form {...form}>
          <form
            className="mx-2 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className={label_class}>
                        Nome de Usuário
                      </FormLabel>
                      <FormControl>
                        <input type="text" className={input_class} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className={label_class}>Senha</FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          className={input_class}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              {!isLoading && (
                <button className={section_btn} type="submit">
                  Continuar
                </button>
              )}
              {isLoading && <Loading />}
            </div>
            <div className="text-center 2xl:text-xl mt-3">
              <p>
                Não possui conta?{" "}
                <CustomLink
                  href="/register"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Cadastre-se.
                </CustomLink>
              </p>
              {error && <Message msg={String(error)} type="error" />}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;