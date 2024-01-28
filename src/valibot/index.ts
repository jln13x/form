"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  useForm,
  useFormContext,
  type DeepPartialSkipArrayKey,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { type BaseSchema, type Output } from "valibot";

export const createValibotForm = <TSchema extends BaseSchema>(
  schema: TSchema
) => {
  const useFormHook = (
    props?: Omit<UseValibotFormProps<TSchema>, "schema">
  ) => {
    return useValibotForm({ schema, ...props });
  };

  const useFormContextHook = () => {
    return useFormContext() as ReturnType<typeof useFormHook>;
  };

  return [useFormHook, useFormContextHook] as const;
};

type UseValibotFormReturn<TSchema extends BaseSchema> = UseFormReturn<
  DeepPartialSkipArrayKey<Output<TSchema>>,
  unknown,
  Output<TSchema>
>;

type UseValibotFormProps<TSchema extends BaseSchema> = Omit<
  UseFormProps<Output<TSchema>>,
  "resolver"
> & {
  schema: TSchema;
};

export const useValibotForm = <TSchema extends BaseSchema>({
  schema,
  ...formProps
}: UseValibotFormProps<TSchema>): UseValibotFormReturn<TSchema> => {
  return useForm({
    resolver: valibotResolver(schema),
    ...formProps,
  });
};
