// const Koa = require('koa');
import Koa from 'koa';
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const mongoose = require('mongoose');
const app = new Koa();
app.use(bodyParser());  // 解析request的body

// 解决跨域
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

// const router = require('koa-router')()
const Router = require('koa-router')

const router = new Router({
	prefix: '/api'
})

const db = mongoose.connect("mongodb://localhost/testDB")

// 账户的数据库模型
var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('User',UserSchema);

// 新增数据
var user = {
  username: 'ydj',
  password: '123123',
  email: ''
}
var newUser = new User(user);
newUser.save();

router.get('/', async (ctx, next) => {
	let val = null
	const data = await User.findOne({username: 'ydj'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		ts: 12345
	}
	ctx.response.body = result
	return result
})

app.use(router.routes());
app.listen(9000);
console.log('app started at port 9000...')
