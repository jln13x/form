import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  useFormContext,
  type DeepPartialSkipArrayKey,
  type UseFormReturn,
} from "react-hook-form";
import * as yup from "yup";
import { type WithoutResolver } from "../helpers";

export const createYupForm = <TSchema extends yup.AnyObjectSchema>(
  schema: TSchema
) => {
  const useFormHook = (props?: Omit<UseYupFormProps<TSchema>, "schema">) => {
    return useYupForm({ schema, ...props });
  };

  const useFormContextHook = () => {
    return useFormContext() as ReturnType<typeof useFormHook>;
  };

  return [useFormHook, useFormContextHook] as const;
};

type UseYupFormReturn<TSchema extends yup.AnyObjectSchema> = UseFormReturn<
  DeepPartialSkipArrayKey<yup.InferType<TSchema>>,
  unknown,
  yup.InferType<TSchema>
>;

type UseYupFormProps<TSchema extends yup.AnyObjectSchema> = WithoutResolver<
  yup.InferType<TSchema>
> & {
  schema: TSchema;
};

export const useYupForm = <TSchema extends yup.AnyObjectSchema>({
  schema,
  ...formProps
}: UseYupFormProps<TSchema>): UseYupFormReturn<TSchema> => {
  return useForm({
    resolver: yupResolver(schema),
    ...formProps,
  });
};
