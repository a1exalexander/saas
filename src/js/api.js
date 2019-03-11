const directorUrl = 'http://api.saas.fundplatform.io/director';
const siteKey = process.env.NODE_ENV === 'production'
  ? '6Lf225MUAAAAAM9d3nHrr415t4Ko7gEjAKdw-QWr'
  : '6Lej1pQUAAAAAEe8hfLDbMGh31AHHA8Hi9FDf-lJ';

const directorAuth = {
  signin: `${directorUrl}/singin`,
  signUp1: `${directorUrl}/signup/step/1`,
  signUp2: `${directorUrl}/signup/step/2`,
  emailVerify: `${directorUrl}/email-verification/verify`,
  resendEmail: `${directorUrl}/email-verification/resend-email`,
  recovery: `${directorUrl}/account-recovery/recover`,
  recoveryVerify: `${directorUrl}/account-recovery/verify`,
  changePassword: `${directorUrl}/settings/change-password`,
};

export { directorAuth, siteKey };
