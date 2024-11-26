import { PropsWithChildren, FC } from 'react';

export type FCC<P = NonNullable<unknown>> = FC<PropsWithChildren<P>>;
