"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UseFormProps,
  useForm,
  useFormContext,
  type DeepPartialSkipArrayKey,
  type UseFormReturn,
} from "react-hook-form";
import { type TypeOf, type ZodSchema } from "zod";

export const createZodForm = <TSchema extends ZodSchema>(schema: TSchema) => {
  const useFormHook = (props?: Omit<UseZodFormProps<TSchema>, "schema">) => {
    return useZodForm({ schema, ...props });
  };

  const useFormContextHook = () => {
    return useFormContext() as ReturnType<typeof useFormHook>;
  };

  return [useFormHook, useFormContextHook] as const;
};

type UseZodFormReturn<TSchema extends ZodSchema> = UseFormReturn<
  DeepPartialSkipArrayKey<TypeOf<TSchema>>,
  unknown,
  TypeOf<TSchema>
>;

type UseZodFormProps<TSchema extends ZodSchema> = Omit<
  UseFormProps<TypeOf<TSchema>>,
  "resolver"
> & {
  schema: TSchema;
};

export const useZodForm = <TSchema extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<TSchema>): UseZodFormReturn<TSchema> => {
  return useForm({
    resolver: zodResolver(schema),
    ...formProps,
  });
};
