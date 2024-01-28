# `@jlns/form`

> Typesafe forms without compromises or fancy abstractions. Built for react-hook-form and your favorite validation library.

This library is a thin wrapper around react-hook-form and just extends it with awesome type safety.

Currently supported: [zod](https://github.com/colinhacks/zod), [valibot](https://github.com/fabian-hiller/valibot), [yup](https://github.com/jquense/yup)

## Installation

```bash
# npm
npm install @jlns/form

# Yarn
yarn add @jlns/form

# pnpm
pnpm add @jlns/form

# Bun
bun add @jlns/form
```

or just copy paste them into your project. You can find the [code here](https://github.com/jln13x/form/tree/main/src).

## Usage

Create your Form Hooks outside of React. This can even be some different file.

```ts
import { createZodForm } from "@jlns/form/zod";

// Destructure the form hooks and name them however you want
const [useProfileForm, useProfileFormContext] = createZodForm(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    }),
  })
);
```

Use the Form Hook like you would normally do with react-hook-form

```tsx
"use client";

const ProfileForm = () => {
  const form = useProfileForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ firstName }) => {
          alert(firstName);
        })}
      >
        ...
      </form>
    </Form>
  );
};
```

Consume the form deep down in some nested components with the Context Hook

```tsx
const Address = () => {
  const form = useProfileFormContext();

  return (
    <div>
      <input {...form.register("address.street")} />
      <input {...form.register("address.city")} />
      <input {...form.register("address.zip")} />
    </div>
  );
};

...

const FullAddress = () => {
  const form = useProfileFormContext();

  const [street, zip, city] = form.watch([
    "address.street",
    "address.zip",
    "address.city",
  ]);

  if (!street || !zip || !city) return null;

  return (
    <p>
      {street}, {zip} {city}
    </p>
  );
};
```

If you don't need to use the Context, just do the following

```tsx
import { useZodForm } from "@jlns/form/zod";

const ProfileForm = () => {
  const form = useZodForm({
    schema: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ firstName }) => {
          alert(firstName);
        })}
      >
        <input {...form.register("firstName")} />
        <input {...form.register("lastName")} />
      </form>
    </Form>
  );
};
```

## Validation Libraries

Zod

```ts
import { createZodForm, useZodForm } from "@jlns/form/zod";
```

Valibot

```ts
import { createValibotForm, useValibotForm } from "@jlns/form/valibot";
```

Yup

```ts
import { createYupForm, useYupForm } from "@jlns/form/yup";
```

<br />
<br />
<br />
<br />
<br />

The package was highly inspired by the [blog post](https://www.brendonovich.dev/blog/the-ultimate-form-abstraction) from [brendonovich](https://x.com/brendonovichdev) aswell as some implementation from [Julius](https://x.com/jullerino).
