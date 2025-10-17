# Security for Nodejs


## import security packages
```
const Security = require('@nagyaly/security');
```

## configure your express app
```
Security.secure(app, { proxy: process.env.proxy });
```

## set global rate limit 100 requests per 60 seconds
```
app.use(Security.rateLimiter(100));
```
