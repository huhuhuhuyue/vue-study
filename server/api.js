const express = require('express')
const app = express()
const cookieParser=require("cookie-parser");
app.use(cookieParser());

app.post('/api/login', function (req, res) {
  req.on('data',function(data){
		obj=JSON.parse(data);
		if (obj.username === "jerry" && obj.password === "123") {
      const token = 'a mock token';
      res.cookie('token', token);
      res.send({ code: '0', token });
    } else {
      res.send({ code: '-100' });
    }
	})
})
app.get('/api/goods', function (req, res) {
  // console.log(req, res)
  res.send({
    code: '0',
    goods: [
      { id: 1, text: "Web全栈架构师", price: 1000 },
      { id: 2, text: "Python架构师", price: 1000 }
    ]
  })
})
app.listen(8000, () => console.log(`服务启动`))