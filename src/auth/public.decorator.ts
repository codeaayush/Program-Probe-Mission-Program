import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** Marks a route or controller as public (skips JWT guard). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
