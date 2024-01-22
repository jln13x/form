import { type FieldValues, type UseFormProps } from "react-hook-form";

export type WithoutResolver<TFiedValues extends FieldValues> = Exclude<
  UseFormProps<TFiedValues>,
  "resolver"
>;
