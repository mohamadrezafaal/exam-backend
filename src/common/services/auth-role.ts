export class AuthRole {
  static SUPER_ADMIN = 'app-super-admin';

  static ADMIN = 'app-admin';

  static USER = 'app-user';

  static REPORTER = 'app-reporter';

  static ALL = [
    AuthRole.SUPER_ADMIN,
    AuthRole.ADMIN,
    AuthRole.USER,
    AuthRole.REPORTER,
  ];

  static ONLY_WRITERS = [AuthRole.SUPER_ADMIN, AuthRole.ADMIN, AuthRole.USER];
}
