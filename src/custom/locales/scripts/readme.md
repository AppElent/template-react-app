# LOCALES

For locales 2 steps have to be executed

1. create tokens.js file. This file is for type safety when using the tokens
2. creating translation files. The base is english, other translations are generated

### Create tokens.js

```
# check file paths
python create_tokens_file.py
```

```
# cd into folder
cd public/locales

npx json-autotranslate -s azure -d --directory-structure default -t key-based -c key,westeurope -m i18next
```
