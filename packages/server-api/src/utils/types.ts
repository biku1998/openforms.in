import { Session } from 'express-session';
import { User } from 'shared-ts';

export type UserSession = Session & Record<'user', User | undefined>;
