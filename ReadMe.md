# Advent Of Code 2022

- Using github code spaces from scratch
- Using Deno for the first time (needs to be installed on the codespace)
- Solving problems command line style! :D

## Installing Deno in a code space 
- Install using the curl command `curl -fsSL https://deno.land/x/install/install.sh | sh`
- Add the following to the `~/.bashrc` file
```
export DENO_INSTALL="/home/codespace/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

### Example Run Command
`deno run --allow-read --watch src/01/a.ts`