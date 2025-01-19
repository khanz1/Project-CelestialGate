export default class ValidationConstant {
  static readonly USERNAME_ISNOTEMPTY = 'Username is required';
  static readonly USERNAME_MIN_LENGTH = 3;
  static readonly USERNAME_MAX_LENGTH = 15;
  static readonly USERNAME_MESSAGE = `Username must be at least ${this.USERNAME_MIN_LENGTH} to ${this.USERNAME_MAX_LENGTH} characters`;

  static readonly USERNAME_UNIQUE_NAME = 'constraint_username';
  static readonly USERNAME_UNIQUE_MESSAGE = 'Username already used';

  static readonly EMAIL_ISNOTEMPTY = 'Email is required';
  static readonly EMAIL_ISEMAIL = 'Email must be a valid email';
  static readonly EMAIL_MIN_LENGTH = 5;
  static readonly EMAIL_MAX_LENGTH = 100;
  static readonly EMAIL_MESSAGE = `Email must be at least ${this.EMAIL_MIN_LENGTH} to ${this.EMAIL_MAX_LENGTH} characters`;

  static readonly EMAIL_UNIQUE_NAME = 'constraint_email';
  static readonly EMAIL_UNIQUE_MESSAGE = 'Email already used';

  static readonly PASSWORD_ISNOTEMPTY = 'Password is required';
  static readonly PASSWORD_MIN_LENGTH = 5;
  static readonly PASSWORD_MAX_LENGTH = 255;
  static readonly PASSWORD_MESSAGE = `Password must be at least ${this.PASSWORD_MIN_LENGTH} to ${this.PASSWORD_MAX_LENGTH} characters`;

  static readonly REDIRECT_ID_ISNOTEMPTY = 'Redirect id is required';
  static readonly REDIRECT_ID_ISNUMBER = 'Redirect id must be a number';
}
