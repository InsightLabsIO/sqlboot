# sqlboot

`sqlboot` is an npm CLI that installs and runs a universal `sqlboot` command on macOS and Ubuntu-based Linux, including Zorin OS.

It sets up:

- Docker Oracle XE using `gvenzl/oracle-xe:21-slim`
- Oracle Instant Client and SQL*Plus
- `rlwrap` with persistent SQL*Plus history
- `tnsnames.ora` with the `XE` alias
- shell environment variables for SQL*Plus
- `/usr/local/bin/sqlboot`

## Use

```sh
npx sqlboot
```

After setup:

```sh
sqlboot
```

Inside SQL*Plus:

```sql
conn system/1234@XE
```

## Supported Systems

- macOS with zsh and Homebrew
- Ubuntu-based Linux, including Zorin OS

Unsupported systems exit with a clear error.

## Defaults

- Container name: `oracle-xe`
- Oracle image: `gvenzl/oracle-xe:21-slim`
- Oracle password: `1234`
- Host port: `1521`
- Service name: `XEPDB1`
- Instant Client directory: `~/oracle/instantclient`

## Overrides

Set environment variables before running the installer:

```sh
SQLBOOT_ORACLE_PASSWORD='change-me' npx sqlboot
```

Available overrides:

- `SQLBOOT_ORACLE_PASSWORD`
- `SQLBOOT_ORACLE_IMAGE`
- `SQLBOOT_ORACLE_CONTAINER`
- `SQLBOOT_ORACLE_PORT`
- `SQLBOOT_ORACLE_SERVICE`
- `SQLBOOT_IC_BASIC_URL`
- `SQLBOOT_IC_SQLPLUS_URL`

## Development

```sh
npm run check
npm run pack:dry
```
