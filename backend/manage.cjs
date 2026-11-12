'use strict';
const {createApi}=require('./api.cjs');
const [command,email]=process.argv.slice(2);
if(command!=='make-owner'||!email){console.error('Foydalanish: node backend/manage.cjs make-owner email@example.com');process.exit(1)}
const api=createApi();const result=api.db.prepare("UPDATE users SET role='owner' WHERE email=?").run(email.trim().toLowerCase());api.close();if(!result.changes){console.error('Avval shu email bilan saytda hisob oching.');process.exit(1)}console.log('Loyiha egasi roli tayinlandi. Saytda chiqib, qayta kiring.');
