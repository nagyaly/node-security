const lusca = require('lusca');
const helmet = require('helmet');
var rateLimit = require('express-rate-limit');
exports.secure = (app, { proxy } = {})=>{
    //----------------------------------------- X-FRAME-OPTIONS (Clickjacking) section
    app.use(lusca.xframe('SAMEORIGIN'));
    //----------------------------------------- Platform for Privacy Preferences Project Section
    app.use(lusca.p3p("p3p@Noga$Secret"));
    //----------------------------------------- HTTP Strict Transport Security Section
    app.use(lusca.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }));
    //----------------------------------------- X-XSS-Protection Section
    app.use(lusca.xssProtection(true));
    //----------------------------------------- X-Content-Type-Option Section
    app.use(lusca.nosniff());
    //----------------------------------------- Referrer-Policy Section
    app.use(lusca.referrerPolicy('same-origin'));
    //----------------------------------------- browser DNS prefetching Section
    app.use(helmet.dnsPrefetchControl());
    //----------------------------------------- Cross-Site Request Forgery
    // app.use(lusca.csrf());
    //----------------------------------------- crossdomain requests Section
    app.use(helmet.permittedCrossDomainPolicies());
    //----------------------------------------- X-Download-Options for IE8+ Section
    app.use(helmet.ieNoOpen());
    //----------------------------------------- Certificate Transparency Section
    // app.use(helmet.expectCt());
    app.set('trust proxy', proxy || '127.0.0.1');
}
exports.rateLimiter = (limit, window=60) => {
    return rateLimit({
        max: limit, windowMs: window * 1000,
        message: "Too many requests, try again after 1 minute",
        standardHeaders: true, legacyHeaders: false,
    });
};
