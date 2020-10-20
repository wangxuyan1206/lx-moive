// 引入基本模块
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const bodyParse = require('body-parser')
const cors = require('cors')


// 使用cors
app.use(cors())

// const proxy = require('http-proxy-middleware');
// app.use('/', proxy.createProxyMiddleware({
//     target: 'https://www.baidu.com', 
//     changeOrigin: true,
//     pathRewrite: {
//         // "^/api": "",
//     }
// }));

// 使用中间件解析表单数据
app.use(bodyParse.urlencoded({extended:false}))

// 使用中间件解析json数据
app.use(bodyParse.json())

const passwdCrypt = function(req,res,next){
    let password = req.body.password
    req.body.passwdCrypted = md5(password + md5(password).substr(0,16))
    next()
}

// 使用mogoose
mongoose.connect("mongodb://localhost:27017/maizuo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    headIcon: String,
    gender: Number,
});
const Model = mongoose.model("User", UserSchema, "users");

const jwt_secret = fs.readFileSync(path.join(__dirname,'.env'),'utf-8')

const checkToken = async function(req,res,next){
    let tempArr = (req.headers.authorization).split(' ');
    let _token = tempArr[tempArr.length - 1]
    
    // 验证token是否合法
    try {
        let verify = jwt.verify(_token, jwt_secret);
        // 判断时间戳是否差值大于你规定的时间

        // 二次验证（为了安全）
        let data = await Model.findOne({ userId: verify.userId });
        if (data) {
            // 合法用户
            req.body.user_id = data.userId;
            next();
        } else {
            res.status(403).send({
                code: "7777",
                info: "illegal user",
            });
        }
    } catch (error) {
        // 验证失败
        res.status(403).send({
            code: "8888",
            info: "illegal access",
        });
    }
}


// 接口：获取登录成功的用户信息
app.get("/api/v1/user_info", checkToken, async (req, res) => {
    // 获取用户数据
    let { userId, gender, mobile, headIcon } = await Model.findOne({
        userId: req.body.user_id,
    });
    res.send({
        code: "1000",
        info: "success",
        user_info: {
            userId,
            gender,
            mobile: mobile.substr(0, 7) + "****",
            headIcon,
        },
    });
});


// 监听路由
app.get('/',(req,res)=> res.send('hello world'))

// 获取初始密码
app.post('/init',passwdCrypt,(req,res)=>{
    res.send('your init password is:' + req.body.passwdCrypted)
})

// 用户登陆验证接口
app.post('/api/v1/login',passwdCrypt,async (req,res)=>{
    let {mobile,passwdCrypted} = req.body
    // 查询数据表
    let result = await Model.findOne({mobile,password:passwdCrypted})

    if(result){
        res.send({
            code:'1000',
            info:'login success',
            data:{
                _token:jwt.sign({
                    userId:result.userId,
                    mobile:result.mobile.substr(0,7) + '****'
                },jwt_secret)
            }
        })
    }else{
        res.send({
            code:'9999',
            info:'mobile or password is invalid',
            data:{}
        })
    }
})


// 监听窗口
app.listen('3000',()=> {
    console.log('Server is running at http://127.0.0.1:3000');
})