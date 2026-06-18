"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  className?: string;
}

export function ContactField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  as = "input",
  rows,
  className,
}: ContactFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel className="field-label" htmlFor={name}>
            {label}
          </FieldLabel>
          {as === "textarea" ? (
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows ?? 4}
              aria-invalid={fieldState.invalid}
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
            />
          )}
          <FieldError errors={fieldState.error ? [fieldState.error] : []} />
        </Field>
      )}
    />
  );
}
