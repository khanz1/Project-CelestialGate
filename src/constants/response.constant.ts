export default class ResponseConstant {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly INTERNAL_SERVER_ERROR = 500;

  static readonly SIGN_UP_SUCCESS = 'Sign up successfully';
  static readonly SIGN_IN_SUCCESS = 'Sign in successfully';
  static readonly SIGN_IN_WITH_GOOGLE_SUCCESS =
    'Sign in with Google successfully';

  static readonly GET_REDIRECTS_SUCCESS = 'All redirects fetched successfully';
  static readonly GET_REDIRECT_SUCCESS = 'Redirect fetched successfully';
  static readonly GET_REDIRECT_NOT_FOUND = (fromUrl: string | number) =>
    `Redirect id:${fromUrl} not found`;

  static readonly CREATE_REDIRECT_LOG_SUCCESS = 'Redirect log created successfully';
}
