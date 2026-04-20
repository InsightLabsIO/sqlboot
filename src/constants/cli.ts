export const HELP_TEXT = `sqlboot

Installs Oracle SQL*Plus, Docker Oracle XE, rlwrap, and the universal sqlboot command.

Usage:
  npx sqlboot
  sqlboot
  sqlboot --help

After setup:
  sqlboot

Inside SQL*Plus:
  conn system/1234@XE

Environment overrides:
  SQLBOOT_ORACLE_PASSWORD
  SQLBOOT_ORACLE_IMAGE
  SQLBOOT_ORACLE_CONTAINER
  SQLBOOT_ORACLE_PORT
  SQLBOOT_ORACLE_SERVICE
  SQLBOOT_IC_BASIC_URL
  SQLBOOT_IC_SQLPLUS_URL
`;
