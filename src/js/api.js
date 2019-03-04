const directorUrl = 'http://104.248.17.143/director';
const siteKey = '6Lej1pQUAAAAAEe8hfLDbMGh31AHHA8Hi9FDf-lJ';

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
